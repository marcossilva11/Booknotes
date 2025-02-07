import axios from "axios";
import Book from "../models/bookModel.js";

const renderHomePage = async (req, res) => {
  const searchQuery = req.query.bookName || "";

  if (!searchQuery) {
    return res.render("index", { books: null });
  }

  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${searchQuery}&limit=5`
    );

    const bookResults = response.data.docs;

    const books = await Promise.all(
      bookResults.map(async (book) => {
        const bookKey = book.key;
        let description = "No description available.";

        try {
          const detailsResponse = await axios.get(
            `https://openlibrary.org${bookKey}.json`
          );

          if (detailsResponse.data.description) {
            description =
              typeof detailsResponse.data.description === "string"
                ? detailsResponse.data.description
                : detailsResponse.data.description.value;

            description = description.replace(/https?:\/\/[^\s]+/g, "").trim();
          }
        } catch (error) {
          console.error(
            `Error fetching description for ${bookKey}:`,
            error.message
          );
        }

        const existingBook = await Book.findByKey(bookKey);

        const alreadyAdded = !!existingBook;

        return {
          title: book.title,
          author: book.author_name ? book.author_name[0] : "Unknown",
          year: book.first_publish_year || "Publish year unknown",
          cover: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : "/public/img/no-cover.png",
          description: description,
          key: bookKey,
          searchQuery,
          alreadyAdded,
        };
      })
    );

    res.render("index", { books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.render("index", { books: [] });
  }
};

const renderMyList = async (req, res) => {
  const order = req.query.order || "titulo_asc";

  let orderByClause;

  switch (order) {
    case "title_asc":
      orderByClause = "ORDER BY title ASC";
      break;
    case "title_desc":
      orderByClause = "ORDER BY title DESC";
      break;
    case "date_desc":
      orderByClause = "ORDER BY date_added DESC";
      break;
    case "date_asc":
      orderByClause = "ORDER BY date_added ASC";
      break;
    case "rating_desc":
      orderByClause = "ORDER BY rating DESC";
      break;
    case "rating_asc":
      orderByClause = "ORDER BY rating ASC";
      break;
    default:
      orderByClause = "ORDER BY title ASC";
  }

  const books = await Book.selectBooks(orderByClause);
  res.render("myList", { books, selectedOrder: order });
};

const renderBookDetails = async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);
  res.render("details.ejs", { book });
};

const addBookToList = async (req, res) => {
  const { bookKey, searchQuery } = req.body;

  if (!bookKey) {
    return res.send("Book Key is required.");
  }

  try {
    const response = await axios.get(`https://openlibrary.org${bookKey}.json`);

    const bookData = response.data;

    const title = bookData.title || "No title available";
    let description = bookData.description
      ? typeof bookData.description === "string"
        ? bookData.description
        : bookData.description.value
      : "No description available";

    description = description.replace(/https?:\/\/[^\s]+/g, "").trim();

    let authorName = "Author not available";
    if (bookData.authors && bookData.authors.length > 0) {
      const authorKey = bookData.authors[0].author.key;
      const authorUrl = `https://openlibrary.org${authorKey}.json`;
      const { data: authorData } = await axios.get(authorUrl);
      authorName = authorData.name || authorName;
    }

    let coverUrl = "Cover not found.";
    if (bookData.covers && bookData.covers.length > 0) {
      const coverId = bookData.covers[0];
      coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
    }

    let publishYear = "Ano de publicação desconhecido";
    if (bookData.first_publish_date) {
      publishYear = new Date(bookData.first_publish_date).getFullYear();
    } else if (bookData.created && bookData.created.value) {
      publishYear = new Date(bookData.created.value).getFullYear();
    }

    await Book.addBook(
      title,
      authorName,
      coverUrl,
      publishYear,
      description,
      bookKey
    );

    res.redirect(`/?bookName=${searchQuery}`);
  } catch (err) {
    console.log(err);
  }
};

const editBook = async (req, res) => {
  const { bookId, userResume, userNotes, rating } = req.body;

  const bookEdited = {
    rating: rating,
    opinionResume: userResume,
    notes: userNotes,
    bookId,
  };

  await Book.updateBook(bookEdited);
  res.redirect(`/bookDetails/${bookId}`);
};

const removeBook = async (req, res) => {
  const { bookId } = req.body;
  await Book.removeBook(bookId);
  res.redirect("/myList");
};

export default {
  renderHomePage,
  addBookToList,
  renderMyList,
  renderBookDetails,
  editBook,
  removeBook,
};

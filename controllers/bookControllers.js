import axios from "axios";

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
          }
        } catch (error) {
          console.error(`Error fetching description for ${bookKey}:`, error.message);
        }

        return {
          title: book.title,
          author: book.author_name ? book.author_name[0] : "Unknown",
          year: book.first_publish_year || "Publish year unknown",
          cover: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : "/public/img/no-cover.png",
          description: description,
        };
      })
    );

    res.render("index", { books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.render("index", { books: [] });
  }
};

export default { renderHomePage };

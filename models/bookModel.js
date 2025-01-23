import pool from "../config/db.js";

const Book = {
  async findByKey(bookKey) {
    const result = await pool.query("SELECT * FROM books WHERE key = $1", [
      bookKey,
    ]);
    return result.rows[0];
  },
  async addBook(title, author, coverUrl, publishYear, description, key) {
    const result = await pool.query(
      "INSERT INTO books (title, author, cover_url, publish_year, description, key) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, author, coverUrl, publishYear, description, key]
    );
    return result.rows[0];
  },
};

export default Book;

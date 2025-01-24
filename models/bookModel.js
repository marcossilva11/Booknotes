import pool from "../config/db.js";

const Book = {
  async findByKey(bookKey) {
    const result = await pool.query("SELECT * FROM books WHERE key = $1", [
      bookKey,
    ]);
    return result.rows[0];
  },
  async findById(bookId) {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [
      bookId,
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
  async selectBooks(orderByClause) {
    const result = await pool.query(`SELECT * FROM books ${orderByClause}`);
    return result.rows;
  },
  async updateBook({ rating, opinionResume, notes, bookId }) {
    const result = await pool.query(
      "UPDATE books SET rating = $1, opinion_resume = $2, notes = $3 WHERE id = $4",
      [rating, opinionResume, notes, bookId]
    );
    return result.rows[0];
  },
  async removeBook(bookId) {
    const result = await pool.query("DELETE FROM books WHERE id = $1", [
      bookId,
    ]);
    return result.rows[0];
  },
};

export default Book;

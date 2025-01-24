import express from "express";
import bookControllers from "../controllers/bookControllers.js";

const router = express.Router();

router.get("/", bookControllers.renderHomePage);
router.get("/myList", bookControllers.renderMyList);
router.get("/orderBooks", bookControllers.renderMyList);
router.get("/bookDetails/:bookId", bookControllers.renderBookDetails);
router.post("/addBookToList", bookControllers.addBookToList);
router.post("/editBook", bookControllers.editBook);
router.post("/removeBook", bookControllers.removeBook);

export default router;

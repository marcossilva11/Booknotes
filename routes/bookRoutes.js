import express from "express";
import bookControllers from "../controllers/bookControllers.js";

const router = express.Router();

router.get("/", bookControllers.renderHomePage);

export default router;
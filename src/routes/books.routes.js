import { Router } from "express";
import { createBook, deleteBook, findBook, findBooks, updateBook } from "../services/book.service.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.get("/book", verifyToken, findBooks);

router.get("/book/:id", verifyToken, findBook);

router.post("/book", verifyToken, createBook);

router.put("/book/:id",verifyToken,  updateBook);

router.delete("/book/:id",verifyToken,  deleteBook);

export default router;
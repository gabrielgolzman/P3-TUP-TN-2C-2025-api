import { Router } from "express";
import { Book } from "../entities/Book.js";
import { ERROR_CODE } from "../errorCodes.js";

const router = Router();

router.get("/book", async (_, res) => {
    const books = await Book.findAll()
    res.json(books);
});

router.get("/book/:id", async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book)
        return res.status(ERROR_CODE.NOT_FOUND).send({ message: "Libro no encontrado" });

    res.json(book);
});

router.post("/book", async (req, res) => {
    const { title, author, rating, pageCount, summary, imageUrl, isAvailable } = req.body;

    // Title and author are required
    if (!title || !author)
        return res.status(ERROR_CODE.BAD_REQUEST).send({ message: "Título y autor son campos requeridos" });

    const newBook = await Book.create({
        title,
        author,
        rating,
        pageCount,
        summary,
        imageUrl,
        isAvailable
    })
    res.json(newBook)
});

router.put("/book/:id", async (req, res) => {
    const { id } = req.params;

    const { title, author, rating, pageCount, summary, imageUrl, isAvailable } = req.body;

    // Title and author are required
    if (!title || !author)
        return res.status(ERROR_CODE.BAD_REQUEST).send({ message: "Título y autor son campos requeridos" });

    const book = await Book.findByPk(id);

    await book.update({
        title,
        author,
        rating,
        pageCount,
        summary,
        imageUrl,
        isAvailable
    });

    await book.save();

    res.send(book);
});

router.delete("/book/:id", async (req, res) => {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book)
        return res.status(ERROR_CODE.NOT_FOUND).send({ message: "Libro no encontrado" });

    await book.destroy();

    res.send(`Borrando libro con ID ${id}`);
})

export default router;
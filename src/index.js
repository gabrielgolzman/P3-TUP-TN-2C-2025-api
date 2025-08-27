import express from "express";

import { PORT } from "./config.js";
import bookRoutes from './routes/books.routes.js';
import { sequelize } from "./db.js";

import './entities/Book.js';

const app = express();

try {
    app.use(express.json());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        next();
    })

    app.listen(PORT);
    app.use(bookRoutes);

    await sequelize.sync();

    console.log(`Server listening on port ${PORT}`)


} catch (error) {
    console.log("There were some errors on initialization")
}



import debugModule from "debug";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import api from "./api/api.js";
import RateLimit from "express-rate-limit";

// Max 150 requests per minute
const limiter = RateLimit({
    windowMs: 1000 * 60,
    max: 150,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();
const debug = debugModule("odin-inventory-application:server");

const app = express();
app.disable("x-powered-by");
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB });

app.use("/api", api);

// Serve frontend
app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

// 404-catcher
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    const errorCode = err.status || 500;
    res.status(err.status || errorCode).json({
        error: { message: err.message, code: err.status || errorCode },
    });
});

app.listen(process.env.PORT || 3000, () => {
    debug(`Server listening on port ${process.env.PORT}`);
});

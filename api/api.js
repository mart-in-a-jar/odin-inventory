import express from "express";

import categoryRouter from "./routes/categoryRouter.js";
import productRouter from "./routes/productRouter.js";
import fileController from "./controllers/fileController.js";

const api = express.Router();

api.use("/categories", categoryRouter);

api.use("/products", productRouter);

api.post("/files/upload", fileController);

// 404-catcher for /api
api.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

export default api;

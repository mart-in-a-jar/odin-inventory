import express from "express";

import categoryRouter from "./routes/categoryRouter.js";
import productRouter from "./routes/productRouter.js";

const api = express.Router();

api.get("/", (req, res) => {
    res.json({ hello: "heia" });
});

api.use("/categories", categoryRouter);

api.use("/products", productRouter);


// 404-catcher for /api
api.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

export default api;

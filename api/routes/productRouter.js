import express from "express";
import productController from "../controllers/productController.js";

// /api/products
const route = express.Router();

route.route("/").get(productController.getAll).post(productController.create);

route.get("/search", productController.search);

route
    .route("/:id")
    .get(productController.getOne)
    .patch(productController.patch)
    .put(productController.put)
    .delete(productController.deleteOne);

export default route;

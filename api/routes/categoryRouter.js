import express from "express";
import categoryController from "../controllers/categoryController.js";
import productController from "../controllers/productController.js";

// /api/categories
const route = express.Router();

route.route("/").get(categoryController.getAll).post(categoryController.create);

route
    // add a PUT method?
    .route("/:id")
    .get(categoryController.getOne)
    .patch(categoryController.patch)
    .delete(categoryController.deleteOne);

route.get("/:id/products", productController.getProductsByCategory);

export default route;

import express from "express";
import productController from "../controllers/productController.js";

const route = express.Router();

route.route("/").get(productController.getAll).post(productController.create);

route
    .route("/:id")
    .get(productController.getOne)
    .patch(productController.patch)
    .put(productController.put)
    .delete(productController.deleteOne);

export default route;

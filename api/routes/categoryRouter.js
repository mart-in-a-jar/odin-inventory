import express from "express";
import categoryController from "../controllers/categoryController.js";

const route = express.Router();

route.route("/").get(categoryController.getAll).post(categoryController.create);

route
    .route("/:id")
    .get(categoryController.getOne)
    .patch(categoryController.patch)
    .delete(categoryController.deleteOne);

export default route;

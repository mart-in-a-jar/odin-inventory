import express from "express";
import productController from "../controllers/productController.js";

const route = express.Router();

route.route("/").get(productController.getAll).post(productController.create);

export default route;

import express from "express";

const route = express.Router();

route.route("/").get((req,res) => {
    res.send("Not implemented: products")
});

export default route;

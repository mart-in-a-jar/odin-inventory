import express from "express";

const api = express.Router();

api.get("/", (req, res) => {
    res.json({ hello: "heia" });
});

export default api;

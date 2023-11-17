import debugModule from "debug";
import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { error } from "console";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();
const debug = debugModule("odin-inventory-application:server");

const app = express();

// Add routes here
app.use((req, res) => {
    res.json({ hello: "hei" });
});

app.listen(process.env.PORT || 3000, () => {
    debug(`Server listening on port ${process.env.PORT}`);
});



// Add 404-catcher here

// Error handler
app.use((err, req, res, next) => {
    res.status = err.status || 500;
    res.json({ error: error.message });
});

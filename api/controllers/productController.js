import Product from "../../models/Product.js";
import asyncHandler from "express-async-handler";

const getAll = asyncHandler(async (req, res) => {
    const allProducts = await Product.find({})
        .populate("categories", { name: 1 })
        .exec();
    res.json({ total: allProducts.length, data: allProducts });
});

const create = asyncHandler(async (req, res, next) => {
    const { name, categories, description, price } = req.body;
    try {
        const newProduct = await Product.create({
            name,
            categories,
            description,
            price,
        });
        // Created successfully
        res.status(201).json(newProduct);
    } catch (e) {
        if (e.code === 11000) {
            const err = new Error(
                `Duplicate value for ${Object.keys(e.keyPattern)[0]}`
            );
            err.status = 400;
            return next(err);
        }
        return res
            .status(400)
            .json({ error: { message: e.message, code: 400 } });
    }
});

// const allowedFields = ["name", "categories", "description", "price"];

export default { getAll, create };

import Product, {
    priceValidationMessage,
    priceValidator,
} from "../../models/Product.js";
import asyncHandler from "express-async-handler";

const getAll = asyncHandler(async (req, res, next) => {
    const allProducts = await Product.find({})
        .populate("categories", { name: 1 })
        .exec();
    res.json({ total: allProducts.length, data: allProducts });
});

const getOne = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id).exec();

    if (!product) {
        return res.sendStatus(404);
    }

    res.json(product);
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

const patch = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
        return res.sendStatus(404);
    }

    const allowedFields = ["name", "categories", "description", "price"];

    for (let [key, value] of Object.entries(req.body)) {
        if (allowedFields.includes(key)) {
            if (key === "price") {
                // Only add modified currencies. Merge in patched price
                product.price = { ...product.price, ...value };
            } else {
                product[key] = value;
            }
        }
    }
    try {
        const savedProduct = await product.save();
        return res.json(savedProduct);
    } catch (e) {
        return res
            .status(400)
            .json({ error: { message: e.message, code: 400 } });
    }
});

const put = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
        return res.sendStatus(404);
    }

    if (!req.body.name) {
        return res
            .status(400)
            .json({ error: { message: "Name is required", code: 400 } });
    }

    if (!priceValidator(req.body.price)) {
        return res
            .status(400)
            .json({ error: { message: priceValidationMessage, code: 400 } });
    }

    // remove values
    product.name = undefined;
    product.categories = undefined;
    product.description = undefined;
    product.price = undefined;

    const allowedFields = ["name", "categories", "description", "price"];

    for (let [key, value] of Object.entries(req.body)) {
        if (allowedFields.includes(key)) {
            product[key] = value;
        }
    }

    try {
        const savedProduct = await product.save();
        return res.json(savedProduct);
    } catch (e) {
        return res
            .status(400)
            .json({ error: { message: e.message, code: 400 } });
    }
});

const deleteOne = asyncHandler(async (req, res, next) => {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) {
        return res.sendStatus(404);
    }

    res.sendStatus(200);
});

const getProductsByCategory = asyncHandler(async (req, res, next) => {
    const products = await Product.find({ categories: req.params.id }).exec();

    res.json(products);
});

const search = asyncHandler(async (req, res, next) => {
    // Can later add more query options (e.g. description) and merge ( + filter out duplicates)
    const results = await Product.find({
        name: new RegExp(req.query.name, "i"),
    }).exec();

    res.json(results);
});

export default {
    getAll,
    create,
    getOne,
    deleteOne,
    patch,
    put,
    getProductsByCategory,
    search,
};

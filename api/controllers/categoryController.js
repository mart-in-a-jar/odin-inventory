import Category from "../../models/Category.js";
import asyncHandler from "express-async-handler";

const getAll = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().exec();
    res.json({ data: allCategories });
});

const create = [
    // add validation
    asyncHandler(async (req, res, next) => {
        const newCategory = await Category.create({
            name: req.body.name,
        });
        // Created successfully
        res.status(201).json(newCategory);
    }),
];

const getOne = (req, res, next) => {
    res.send("Not implemented: Get specific category");
};

export default { getAll, getOne, create };

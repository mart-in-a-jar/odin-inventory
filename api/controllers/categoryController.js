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

const getOne = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();

    if (!category) {
        return res.sendStatus(404);
    }

    res.json({ data: category });
});

const patch = [
    // add validation
    asyncHandler(async (req, res, next) => {
        const category = await Category.findById(req.params.id).exec();

        if (!category) {
            return res.sendStatus(404);
        }

        for (let [key, value] of Object.entries(req.body)) {
            category[key] = value;
        }
        try {
            const savedCategory = await category.save();
            res.json(savedCategory);
        } catch (error) {
            res.sendStatus(400);
        }
    }),
];

const deleteOne = asyncHandler(async (req, res, next) => {
    const result = await Category.findByIdAndDelete(req.params.id);
    if (!result) {
        return res.sendStatus(404);
    }
    res.sendStatus(200);
});

export default { getAll, getOne, create, patch, deleteOne };

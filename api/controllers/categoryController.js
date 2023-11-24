import Category from "../../models/Category.js";
import asyncHandler from "express-async-handler";

const getAll = asyncHandler(async (req, res, next) => {
    const paginate = +req.query.paginate;
    const page = +req.query.page || 1;

    const totalCategories = await Category.find({}).countDocuments().exec();
    // Return segment
    if (paginate && totalCategories) {
        const skipAmount = (page - 1) * paginate;
        const categorySegment = await Category.find({}, null, {
            limit: paginate,
            skip: skipAmount,
        }).exec();

        const firstShown = skipAmount + 1;
        const isLastPage = skipAmount + paginate >= totalCategories;

        const resultObject = {
            total: totalCategories,
            segment: undefined,
            data: categorySegment,
        };

        if (skipAmount < totalCategories) {
            resultObject.segment = {
                from: firstShown,
                to: isLastPage ? totalCategories : skipAmount + paginate,
            };
            // Page doesn't exist
        } else {
            return res
                .status(400)
                .json({ error: { message: "overflow", code: 400 } });
        }
        if (!isLastPage) {
            resultObject.nextPage = `/api/categories?paginate=${paginate}&page=${
                page + 1 || 2
            }`;
        }

        return res.json(resultObject);
    }
    // Return all
    const allCategories = await Category.find({}).exec();
    res.json({ total: allCategories.length, data: allCategories });
});

const create = [
    // add validation
    async (req, res, next) => {
        try {
            const newCategory = await Category.create({
                name: req.body.name,
            });
            // Created successfully
            res.status(201).json(newCategory);
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
    },
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

        const allowedFields = ["name"];

        for (let [key, value] of Object.entries(req.body)) {
            if (allowedFields.includes(key)) {
                category[key] = value;
            }
        }
        try {
            const savedCategory = await category.save();
            res.json(savedCategory);
        } catch (e) {
            return res
                .status(400)
                .json({ error: { message: e.message, code: 400 } });
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

export default {
    getAll,
    getOne,
    create,
    patch,
    deleteOne,
};

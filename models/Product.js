import mongoose from "mongoose";

const allowedCurrencies = ["nok", "usd"];

const priceValidator = (input) => {
    if (typeof input !== "object") {
        return false;
    }
    const allKeysAreValid = Object.keys(input).every((key) => {
        return allowedCurrencies.includes(key.toLowerCase());
    });
    const allValuesAreValid = Object.values(input).every((val) => {
        return typeof val === "number" && val >= 0;
    });

    return allKeysAreValid && allValuesAreValid;
};

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 100,
            unique: true,
        },
        categories: {
            type: [mongoose.ObjectId],
            ref: "categories",
        },
        description: { type: String, maxLength: 200 },
        price: {
            type: Object,
            required: true,
            validate: {
                validator: priceValidator,
                message: `Price needs to be defined as an object with currencies as keys, like {currency: price}. Allowed currencies: ${allowedCurrencies}`,
            },
        },
    },
    { timestamps: true }
);

ProductSchema.virtual("url").get(function () {
    return `/products/${this._id}`;
});

const model = mongoose.model("products", ProductSchema);
export default model;

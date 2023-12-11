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

const priceValidationMessage = `Price needs to be defined as an object with currencies as keys, like {currency: price}. Allowed currencies: ${allowedCurrencies}`;

const convertCurrenciesToUpperCase = (input) => {
    const newObj = {};
    for (let [key, value] of Object.entries(input)) {
        newObj[key.toUpperCase()] = value;
    }
    return newObj;
};

const stringNotEmpty = (input) => {
    return input.trim().length > 0;
};
const emptyNameErrorMessage = "Name can not be empty";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            validate: {
                validator: stringNotEmpty,
                message: emptyNameErrorMessage,
            },
            maxLength: 100,
            trim: true,
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
                message: priceValidationMessage,
            },
            set: convertCurrenciesToUpperCase,
        },
    },
    { timestamps: true }
);

ProductSchema.virtual("url").get(function () {
    return `/products/${this._id}`;
});

const model = mongoose.model("products", ProductSchema);
export default model;
export { priceValidator, priceValidationMessage };

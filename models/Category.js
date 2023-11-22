import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 60,
            index: true,
            unique: true,
        },
    },
    { timestamps: true }
);

CategorySchema.virtual("url").get(function () {
    return `/categories/${this._id}`;
});

const model = mongoose.model("categories", CategorySchema);
export default model;

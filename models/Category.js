import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 60,
        },
    },
    { timestamps: true }
);

CategorySchema.pre("save", function (next) {
    this.updated = Date.now();
    next();
});

const model = mongoose.model("categories", CategorySchema);
export default model;

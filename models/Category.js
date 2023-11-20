import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 60,
    },
});

const model = mongoose.model("categories", CategorySchema);
export default model;

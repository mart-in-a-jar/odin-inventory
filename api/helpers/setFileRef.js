import Product from "../../models/Product.js";

const setFileRef = async (id, filename) => {
    const product = await Product.findById(id).exec();
    product.image = filename;
    await product.save();
};

export default setFileRef;

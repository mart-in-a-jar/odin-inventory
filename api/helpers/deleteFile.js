import Product from "../../models/Product.js";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";

const getPath = (relativePath) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    return path.join(__dirname, relativePath);
};

const deleteFile = async (file) => {
    try {
        await fs.unlink(file);
    } catch (err) {
        console.error(err);
    }
};

const listFiles = async (dir) => {
    try {
        const files = await fs.readdir(dir);
        return files;
    } catch (err) {
        console.error(err);
    }
};

const deleteProductImageIfItExists = async (productId) => {
    const product = await Product.findById(productId);

    const imageName = product.image;

    if (imageName.startsWith("default")) {
        return;
    }
    const fileDir = getPath("../../uploads");
    const files = await listFiles(fileDir);
    for (let file of files) {
        if (file.startsWith(productId)) {
            deleteFile(`${fileDir}/${file}`);
        }
    }
};

export { deleteProductImageIfItExists };

import asyncHandler from "express-async-handler";
import multer from "multer";
import { deleteProductImageIfItExists } from "../helpers/deleteFile.js";
import setFileRef from "../helpers/setFileRef.js";

// const upload = multer({ dest: "uploads/" });

// use this function to allow setting filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: async (req, file, cb) => {
        // const extention = file.mimetype.match(/.+\/(.+)/)[1];
        if (!file.mimetype.startsWith("image")) {
            const err = new Error("Wrong file type");
            err.status = 401;
            return cb(err);
        }
        // delete old image if it exists
        await deleteProductImageIfItExists(req.body.name);

        const date = new Date().getTime();
        const extention = file.originalname.split(".").pop();
        cb(null, `${req.body.name}-${date}.${extention}`);
    },
});

const upload = multer({ storage: storage });

const fileController = [
    upload.single("image"),
    asyncHandler(async (req, res, next) => {
        const id = req.body.id;
        await setFileRef(id, req.file.filename);
        res.send("Image uploaded");
    }),
];

export default fileController;

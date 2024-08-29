import { HttpStatus } from "#constant/httpStatus";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { resolve } from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";

interface ISupportFiles {
    types: string[];
    subtypes: string[];
}

interface IField {
    name: string;
    maxCount?: number;
}

const filePath = resolve(__dirname, "..", "..", "resouces", "static", "assets", "uploads");
let fileId: string;

const storage: multer.StorageEngine = multer.diskStorage({
    destination: function (_, __, cb) {
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
        }
        cb(null, filePath);
    },
    filename: function (_, file, cb) {
        fileId = uuid();
        cb(null, `${fileId}.${file.originalname.split(".")[1]}`);
    }
});

const filter = (supportFiles: ISupportFiles[]) => {
    return (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        const [type, subtype] = file.mimetype.split("/");

        const isSupported = supportFiles.some((config) => config.types.includes(type) && config.subtypes.includes(subtype));

        if (isSupported) {
            cb(null, true);
        } else {
            LOGGER.error(`File type ${file.mimetype} is not supported`);
            cb(null, false);
        }
    };
};

export const uploadFileWithFieldsHandler = (fields: IField[], supportFiles: ISupportFiles[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!Array.isArray(fields) || !Array.isArray(supportFiles)) {
            res.locals = { status: HttpStatus.BAD_REQUEST, message: "Invalid fields or supportFiles configuration" };
            return next();
        }

        const getFields = fields.map((field) => ({ name: field.name, maxCount: field.maxCount || 1 }));
        const upload = multer({ storage, fileFilter: filter(supportFiles) }).fields(getFields);

        upload(req, res, async (err: any) => {
            if (err instanceof multer.MulterError) {
                LOGGER.error(err.message);
                res.locals = { status: HttpStatus.BAD_REQUEST, message: err.message };
                return next();
            } else if (err) {
                LOGGER.error(err.message);
                res.locals = { status: HttpStatus.INTERNAL_SERVER_ERROR, message: err.message };
                return next();
            }

            return next();
        });
    };
};

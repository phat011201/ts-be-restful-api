import { HttpStatus } from "#constant/httpStatus";
import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Not found");
    LOGGER.warning(error);

    return res.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
    });
};

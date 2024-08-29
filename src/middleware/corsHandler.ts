import { HttpStatus } from "#constant/httpStatus";
import { Request, Response, NextFunction } from "express";

export const corsHandler = (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", req.header("origin"));
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
        return res.status(HttpStatus.OK).json({});
    }
    next();
};

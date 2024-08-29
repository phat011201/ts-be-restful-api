import { HttpStatus } from "#constant/httpStatus";
import { NextFunction, Request, Response } from "express";

export function roleHandler(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { decoded } = res.locals;

        if (!roles.includes(decoded.role)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: "Forbidden" });
        }

        next();
    };
}

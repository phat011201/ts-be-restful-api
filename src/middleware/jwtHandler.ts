import { JWT_TOKEN_SECRET } from "#config/config";
import { HttpStatus } from "#constant/httpStatus";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function verifyTokenFromCookie(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    try {
        if (!token) {
            LOGGER.error("Token not found");
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Token not found" });
        }
        const decoded = jwt.verify(token, JWT_TOKEN_SECRET);
        res.locals = { decoded };
        next();
    } catch (e: any) {
        LOGGER.error(e.message);
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: e.message });
    }
}

export function generateToken<T extends string | object | Buffer>(payload: T, expiresIn: string = "1h"): string {
    return jwt.sign(payload, JWT_TOKEN_SECRET, { expiresIn });
}

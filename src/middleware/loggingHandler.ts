import { Request, Response, NextFunction } from "express";

export const loggingHandler = (req: Request, res: Response, next: NextFunction) => {
    LOGGER.log("----------------------------------------");
    LOGGER.log(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on("finish", () => {
        LOGGER.log(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
};

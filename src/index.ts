import "#config/logger";
import { DOMAIN, PORT } from "#config/config";
import express from "express";
import { Server } from "http";
import cookieParser from "cookie-parser";
import { corsHandler } from "middleware/corsHandler";
import { notFoundHandler } from "middleware/notFoundHandler";
import { loggingHandler } from "middleware/loggingHandler";
import { defineRoutes } from "#module/routes";
import { CheckHealthController } from "#controller/checkHealthController";
import { defineDatabase } from "#module/database";
import { AuthController } from "#controller/authController";
import { UserController } from "#controller/userController";
import { RoleController } from "#controller/roleController";

/**
 * Express application instance.
 */
const app = express();

(async () => {
    LOGGER.log("----------------------------------------");
    LOGGER.log("Initializing API");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    LOGGER.log("----------------------------------------");
    LOGGER.log("Logging & Configuration");
    app.use(loggingHandler);
    app.use(corsHandler);

    LOGGER.log("----------------------------------------");
    LOGGER.log("Define Database");
    await defineDatabase();

    LOGGER.log("----------------------------------------");
    LOGGER.log("Define Controller Routing");
    const routes = [CheckHealthController, AuthController, UserController, RoleController];
    await defineRoutes(app, ...routes);

    LOGGER.log("----------------------------------------");
    LOGGER.log("Define Routing Not Found");
    app.use(notFoundHandler);

    LOGGER.log("----------------------------------------");
    LOGGER.log("Starting Server");
    const server = new Server(app);
    server.listen(PORT, () => {
        LOGGER.log("----------------------------------------");
        LOGGER.log(`Server is running on http://${DOMAIN}`);
        LOGGER.log("----------------------------------------");
    });
})();

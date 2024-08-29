import { Express } from "express";

export const defineRoutes = async (application: Express, ...controllers: any[] ) => {
    try {
        for (let i = 0; i < controllers.length; i++) {
            const controller = new controllers[i]();
            const route = controller.getRouter();

            application.use(route);
        }
    } catch (e: any) {
        LOGGER.error("Error loading routes", e.message);
    }
};

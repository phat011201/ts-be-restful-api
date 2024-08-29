import { Method } from "#constant/method";
import { Router } from "express";

/**
 * Controller
 * @class
 */
export class Controller {
    protected path: string;
    protected router: Router;

    constructor(path: string = "/") {
        this.path = path;
        this.router = Router();
    }

    public getRouter() {
        return this.router;
    }

    /**
     * @param path
     * @param method
     * @param handler
     * @returns
     */
    protected mapping = async (path: string, method: Method, ...handler: any[]) => {
        try {
            LOGGER.log(`Mapping ${method} ${this.path}${path}`);

            if (method === Method.GET || method === Method.POST || method === Method.PUT || method === Method.DELETE)
                return this.router[method](this.path + path, handler);

            LOGGER.error(`Method ${method} is not supported`);
        } catch (e: any) {
            LOGGER.error(e.message);
        }
    };

    protected get = async (path: string, ...handler: any[]) => {
        this.mapping(path, Method.GET, handler);
    };

    protected post = async (path: string, ...handler: any[]) => {
        this.mapping(path, Method.POST, handler);
    };

    protected put = async (path: string, ...handler: any[]) => {
        this.mapping(path, Method.PUT, handler);
    };

    protected delete = async (path: string, ...handler: any[]) => {
        this.mapping(path, Method.DELETE, handler);
    };
}

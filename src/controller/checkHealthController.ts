import { HttpStatus } from "#constant/httpStatus";
import { Request, Response } from "express";
import { Controller } from "#module/controller";

/**
 * @extends Controller
 */
export class CheckHealthController extends Controller {
    constructor() {
        super("/check-health");

        this.get("", this.helloWorld);
    }

    private helloWorld = async (req: Request, res: Response): Promise<void> => {
        try {
            res.status(HttpStatus.OK).json({ message: "Connected Good" });
        } catch (e: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    };
}

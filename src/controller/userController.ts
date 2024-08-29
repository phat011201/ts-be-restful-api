import { HttpStatus } from "#constant/httpStatus";
import { verifyTokenFromCookie } from "#middleware/jwtHandler";
import { roleHandler } from "#middleware/roleHandler";
import { Controller } from "#module/controller";
import { UserService } from "#service/impl/userService";
import { IUserService } from "#service/IUserService";
import { Request, Response } from "express";

export class UserController extends Controller {
    private userService: IUserService;

    constructor() {
        super("/api/user");

        this.userService = new UserService();

        this.get("", verifyTokenFromCookie, roleHandler("super admin"), this.getAll);
    }

    private getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const response = await this.userService.getAll();
            res.status(response.status).json(response.json());
        } catch (e: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    };
}

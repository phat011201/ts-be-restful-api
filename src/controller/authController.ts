import { HttpStatus } from "#constant/httpStatus";
import { RoleConstant } from "#constant/roleConstant";
import { verifyTokenFromCookie } from "#middleware/jwtHandler";
import { roleHandler } from "#middleware/roleHandler";
import { Controller } from "#module/controller";
import { IAuthService } from "#service/IAuthService";
import { AuthService } from "#service/impl/authService";
import { Request, Response } from "express";

/**
 * @extends Controller
 * @exports AuthController
 */
export class AuthController extends Controller {
    private authService: IAuthService;

    constructor() {
        super("/api/auth");

        this.authService = new AuthService();

        this.post("/login", this.login);
        this.post("/register", this.register);
        this.post("/logout", this.logout);
        this.put("/update", verifyTokenFromCookie, roleHandler(RoleConstant.SUPER_ADMIN), this.update);
    }

    /**
     * @param req
     * @param res
     * @returns
     */
    private login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const response = await this.authService.login({email, password});

            if (response.data?.token) {
                res.cookie("token", response.data.token, { httpOnly: true });
            }

            res.status(response.status).json(response.json());
        } catch (e: any) {
            LOGGER.error(e.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message });
        }
    };

    /**
     * @param req
     * @param res
     * @returns
     */
    private register = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const response = await this.authService.register({email, password});

            res.status(response.status).json(response.json());
        } catch (e: any) {
            LOGGER.error(e.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message });
        }
    };

    /**
     * @param req
     * @param res
     */
    private logout = async (req: Request, res: Response) => {
        try {
            res.clearCookie("token");
            res.status(HttpStatus.OK).json({ message: "Logged out" });
            LOGGER.info(`User logged out`);
        } catch (e: any) {
            LOGGER.error(e.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message });
        }
    };

    /**
     * @param req
     * @param res
     * @returns
     */
    private update = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const response = await this.authService.update({email, password});

            res.status(response.status).json(response.json());
        } catch (e: any) {
            LOGGER.error(e.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message });
        }
    };
}

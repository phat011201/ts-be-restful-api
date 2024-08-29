import { HttpStatus } from "#constant/httpStatus";
import { RoleConstant } from "#constant/roleConstant";
import { verifyTokenFromCookie } from "#middleware/jwtHandler";
import { roleHandler } from "#middleware/roleHandler";
import { Controller } from "#module/controller";
import { RoleService } from "#service/impl/roleService";
import { IRoleService } from "#service/IRoleService";
import { Request, Response } from "express";

export class RoleController extends Controller {
    private readonly roleService: IRoleService;

    constructor() {
        super("/api/role");

        this.roleService = new RoleService();

        this.get("", verifyTokenFromCookie, roleHandler(RoleConstant.SUPER_ADMIN, RoleConstant.ADMIN), this.getRoles);
    }

    private getRoles = () => {
        return async (req: Request, res: Response) => {
            try {
                const response = await this.roleService.getAll();
                return res.status(HttpStatus.OK).json(response.json());
            } catch (e: any) {
                LOGGER.error(e.message);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: e.message });
            }
        };
    };
}

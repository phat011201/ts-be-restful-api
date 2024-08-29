import { IRoleService } from "#service/IRoleService";
import { ResponsePayload } from "#payload/reponsePayload";
import { IRoleAttributes, Role } from "#model/role";
import { RoleResponseDto } from "#payload/response/roleResponseDto";
import { HttpStatus } from "#constant/httpStatus";

export class RoleService implements IRoleService {
    getAll = async (): Promise<ResponsePayload<RoleResponseDto[]>> => {
        try {
            const roles = await Role.findAll();
            const roleResponseDtos = roles.map(role => new RoleResponseDto(role));
            return new ResponsePayload({ status: HttpStatus.OK, message: "Get All Role Success", data: roleResponseDtos });
        } catch (e: any) {
            LOGGER.error(e.message);
            return new ResponsePayload({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: e.message });
        }
    };

    getById = async (id: string): Promise<ResponsePayload<RoleResponseDto>> => {
        throw new Error("Method not implemented.");
    };

    create = async (model: IRoleAttributes): Promise<ResponsePayload<RoleResponseDto>> => {
        throw new Error("Method not implemented.");
    };

    update = async (id: string, model: IRoleAttributes): Promise<ResponsePayload<RoleResponseDto>> => {
        throw new Error("Method not implemented.");
    };

    delete = async (id: string): Promise<ResponsePayload<RoleResponseDto>> => {
        throw new Error("Method not implemented.");
    };
}

import { IRoleAttributes } from "#model/role";
import { RoleResponseDto } from "#payload/response/roleResponseDto";
import { ICRUDService } from "./ICRUDService";

export interface IRoleService extends ICRUDService<IRoleAttributes, RoleResponseDto> {}

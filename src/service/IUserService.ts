import { IUserAttributes } from "#model/user";
import { UserResponseDto } from "#payload/response/userResponseDto";
import { ICRUDService } from "./ICRUDService";

export interface IUserService extends ICRUDService<IUserAttributes, UserResponseDto> {}

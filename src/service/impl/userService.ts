import { IUserService } from "#service/IUserService";
import { ResponsePayload } from "#payload/reponsePayload";
import { HttpStatus } from "#constant/httpStatus";
import { UserResponseDto } from "#payload/response/userResponseDto";
import { IUserAttributes, User } from "#model/user";

export class UserService implements IUserService {
    getAll = async (): Promise<ResponsePayload<UserResponseDto[]>> => {
        try {
            const allUser: IUserAttributes[] = await User.findAll();
            if (!allUser) {
                LOGGER.warn(`No user found`);
                return new ResponsePayload({ status: HttpStatus.NOT_FOUND, message: "No user found" });
            }

            const userResponseDto = allUser.map((user) => {
                return new UserResponseDto({
                    id: user.id as string,
                    email: user.email,
                    role: user.roleId as string,
                });
            });

            LOGGER.info(`Get all user success`);
            return new ResponsePayload({ status: HttpStatus.OK, message: "Success", data: userResponseDto });
        } catch (e: any) {
            return new ResponsePayload({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: e.message });
        }
    };

    getById = async (id: string): Promise<ResponsePayload<UserResponseDto>> => {
        throw new Error("Method not implemented.");
    };

    update = async (id: string, data: IUserAttributes): Promise<ResponsePayload<UserResponseDto>> => {
        throw new Error("Method not implemented.");
    };

    create = async (data: IUserAttributes): Promise<ResponsePayload<UserResponseDto>> => {
        throw new Error("Method not implemented.");
    };

    delete = async (id: string): Promise<ResponsePayload<UserResponseDto>> => {
        throw new Error("Method not implemented.");
    };
}

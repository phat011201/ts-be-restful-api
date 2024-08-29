import { hash, verify } from "#config/hash";
import { HttpStatus } from "#constant/httpStatus";
import { User } from "#model/user";
import { ResponsePayload } from "#payload/reponsePayload";
import { IAuthService } from "#service/IAuthService";
import { Role } from "#model/role";
import { AuthRequestDto } from "#payload/request/authRequestDto";
import { AuthResponseDto } from "#payload/response/authResponseDto";
import { generateToken } from "#middleware/jwtHandler";
import { GenerateTokenRequestDto } from "#payload/request/generateTokenRequestDto";

export class AuthService implements IAuthService {
    login = async ({ email, password }: AuthRequestDto): Promise<ResponsePayload<AuthResponseDto>> => {
        try {
            const user = await User.findOne({ where: { email } });

            // Check if user exists
            if (!user) {
                LOGGER.warn(`User ${email} not found`);
                return new ResponsePayload({ status: HttpStatus.UNAUTHORIZED, message: "Unauthorized" });
            }

            // Check if password is valid
            const isPasswordValid = verify(password, user.getDataValue("password"));
            if (!isPasswordValid) {
                LOGGER.warn(`User ${email} wrong password`);
                return new ResponsePayload({ status: HttpStatus.UNAUTHORIZED, message: "Unauthorized" });
            }

            // get name role by pk from user
            const role = await Role.findByPk(user.getDataValue("roleId"), { paranoid: false });
            if (!role) {
                LOGGER.error(`Role not found`);
                return new ResponsePayload({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Role not found" });
            }

            // Generate token
            const token = generateToken<GenerateTokenRequestDto>({ email, password: user.getDataValue("password"), role: role.getDataValue("name") });

            LOGGER.info(`User ${email} logged in`);
            return new ResponsePayload({ status: HttpStatus.OK, message: "Logged in", data: { email, role: role.getDataValue("name"), token } });
        } catch (e: any) {
            LOGGER.error(e.message);
            return new ResponsePayload({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: e.message });
        }
    };

    register = async ({ email, password }: AuthRequestDto): Promise<ResponsePayload<AuthResponseDto>> => {
        try {
            const user = await User.findOne({ where: { email } });

            // Check if user exists
            if (user) {
                LOGGER.warn(`User ${email} exists`);
                return new ResponsePayload({ status: HttpStatus.BAD_REQUEST, message: "User exists" });
            }

            // Get role "user" by role name
            const userRole = await Role.findOne({ where: { name: "user" } });
            if (!userRole) {
                LOGGER.error(`Role not found`);
                return new ResponsePayload({ status: HttpStatus.NOT_FOUND, message: "Role not found" });
            }

            // hash password
            const hashedPassword = hash(password);

            // Create user
            await User.create({ email, password: hashedPassword, roleId: userRole.getDataValue("id") as string });

            LOGGER.info(`User ${email} registered`);
            return new ResponsePayload({ status: HttpStatus.CREATED, message: "User created", data: { email, role: userRole.getDataValue("name") } });
        } catch (e: any) {
            LOGGER.error(e.message);
            return new ResponsePayload({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: e.message });
        }
    };

    update = async ({ email, password }: AuthRequestDto): Promise<ResponsePayload<AuthResponseDto>> => {
        try {
            const user = await User.findOne({ where: { email } });

            // Check if user exists
            if (!user) {
                LOGGER.warn(`User ${email} not found`);
                return new ResponsePayload({ status: HttpStatus.BAD_REQUEST, message: "User not found" });
            }

            // Get role "admin" by role name
            const adminRole = await Role.findOne({ where: { name: "admin" } });
            if (!adminRole) {
                LOGGER.error(`Role not found`);
                return new ResponsePayload({ status: HttpStatus.NOT_FOUND, message: "Role not found" });
            }

            // hash password
            const hashedPassword = hash(password);

            // Update user
            await user.update({ password: hashedPassword, roleId: adminRole.getDataValue("id") as string });

            LOGGER.info(`User ${email} updated`);
            return new ResponsePayload({ status: HttpStatus.OK, message: "User updated", data: { email, role: adminRole.getDataValue("name") } });
        } catch (e: any) {
            LOGGER.error(e.message);
            return new ResponsePayload({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: e.message });
        }
    };
}

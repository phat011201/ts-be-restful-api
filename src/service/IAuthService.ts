import { ResponsePayload } from "#payload/reponsePayload";
import { AuthRequestDto } from "#payload/request/authRequestDto";
import { AuthResponseDto } from "#payload/response/authResponseDto";

export interface IAuthService {
    login: ({ email, password }: AuthRequestDto) => Promise<ResponsePayload<AuthResponseDto>>;
    register: ({ email, password }: AuthRequestDto) => Promise<ResponsePayload<AuthResponseDto>>;
    update: ({ email, password }: AuthRequestDto) => Promise<ResponsePayload<AuthResponseDto>>;
}

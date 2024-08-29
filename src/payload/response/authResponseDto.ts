export class AuthResponseDto {
    email: string;
    role: string;
    token?: string;

    constructor({ email, role, token }: { email: string; role: string; token?: string }) {
        this.email = email;
        this.role = role;
        this.token = token;
    }
}
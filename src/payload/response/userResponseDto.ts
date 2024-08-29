export class UserResponseDto {
    id: string;
    email: string;
    role: string;

    constructor({ id, email, role }: { id: string; email: string; role: string }) {
        this.id = id;
        this.email = email;
        this.role = role;
    }
}

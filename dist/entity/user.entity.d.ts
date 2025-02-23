import { Role } from "@prisma/client";
export declare class User {
    id: number;
    username: string;
    password: string;
    role: Role;
    foto_profile?: string;
}

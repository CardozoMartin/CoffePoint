// src/interfaces/auth.interfaces.ts

export interface ILoginRequest {
    username: string;
    password: string;
}

export interface IUserPayload {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    isAdmin: boolean;
}

export interface ITokenPayload {
    user: IUserPayload;
}

export interface ILoginResponse {
    success: boolean;
    data: string | null; // token
    message: string;
}

export interface IUser {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    isAdmin: boolean;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
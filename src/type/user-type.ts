import { User } from "@prisma/client"

export interface UserData {
    id : string,
    username : string,
    email : string,
    role : string
}

export interface  RegisterRequest {
    email : string,
    username : string,
    password : string,
} 

export interface UserResponse {
    email : string,
    username : string,
    role : string,
    token? : string
}

export interface LoginRequest {
    email : string,
    password : string
}

export function userResponse(data : User): UserResponse {
    return {
        email : data.email,
        username : data.username,
        role : data.role
    }
}

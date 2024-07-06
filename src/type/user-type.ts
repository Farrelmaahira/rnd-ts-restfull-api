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
    id : string
    email : string,
    username : string,
    role : string,
    status : string
}

export interface LoginRequest {
    email : string,
    password : string
}

export interface UserRequest extends UserResponse  {

} 

export function userResponse(data : User): UserResponse {
    return {
        id : data.id,
        email : data.email,
        username : data.username,
        role : data.role,
        status : data.status
    }
}

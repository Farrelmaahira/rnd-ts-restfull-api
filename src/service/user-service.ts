import { ResponseError } from "../error/response-error";
import { LoginRequest, RegisterRequest, UserData, UserResponse, userResponse } from "../type/user-type";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import { prisma } from "./../application/db";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export class UserService {
    static async register(payload: RegisterRequest): Promise<UserResponse> {
        const requestData = Validation.validate(UserValidation.REGISTER, payload);

        const totalUserWithSameUsername = await prisma.user.count({
            where: {
                email: requestData.email
            }
        })

        if (totalUserWithSameUsername !== 0) {
            throw new ResponseError('Username already exist', 400);
        }

        const hashPass: string = await bcrypt.hash(requestData.password, 10) 

        requestData.password = hashPass
        console.log(requestData);

        const user = await prisma.user.create({
            data: requestData
        })

        return userResponse(user);
    }

    static async login(payload: LoginRequest): Promise<string> {
        const requestData = Validation.validate(UserValidation.LOGIN, payload);

        const checkUsername = await prisma.user.findFirst({
            where : {
                email : requestData.email
            }
        })

        if(checkUsername === null) {
            throw new ResponseError('Email or Password not match', 400);
        }

        const validatePassword: boolean = bcrypt.compareSync(requestData.password, checkUsername.password);

        if(!validatePassword) {
            throw new ResponseError('Email or Password not match', 400);
        }
        
        const token: string = await bcrypt.hash('api-token', 10);
        const updateUser = await prisma.user.update({
            where : {
                email : requestData.email
            },
            data : {
                token : token
            }
        })

        return token
    }

    static async get(): Promise<UserData[]> {
        const data = await prisma.user.findMany();
        return data;
    }


}
import { LoginRequest, RegisterRequest } from "../type/user-type";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user-service";

export class AuthController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const reqBody: RegisterRequest = req.body as RegisterRequest 
            const data = await UserService.register(reqBody)
            res.json({
                data : data
            }).status(200)
        } catch (error) {
            next(error)
        }
    }

    static async login(req : Request, res : Response, next : NextFunction) {
        try {
            const reqBody: LoginRequest = req.body as LoginRequest;
            const data = await UserService.login(reqBody);
            res.status(200).json({
                token : data
            })
        } catch (error) {
           next(error) 
        }
    }
}
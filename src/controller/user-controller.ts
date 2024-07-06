import { Response, Request, NextFunction } from "express";
import { UserService } from "../service/user-service";

export class UserController {

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
          const data = await UserService.get();
          res.status(200).json({
            body : data
          });
        } catch (error) {
            next(error);
        }
    }
}

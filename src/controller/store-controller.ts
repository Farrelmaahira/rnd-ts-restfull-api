import { Request, Response, NextFunction } from "express";
import { StoreService } from "../service/store-service";
import { RequestOpenStore } from "../type/store-type";


export class StoreController {
    static async requestOpen(req: Request, res: Response, next: NextFunction) {
        try {
            const reqBody: RequestOpenStore = {
                name : req.body.name,
                description : req.body.description,
                address : req.body.address,
                user : req.user
            } 
            const data = await StoreService.requestOpenStore(reqBody);
            res.status(200).json({
               message : 'Success request to open a store',
               data : data 
            })
        } catch (error) {
           next(error) 
        }
    }
}
import { Request, Response, NextFunction } from "express";
import {ResponseError} from "./../error/response-error";
import { ZodError } from "zod";

export const errorMiddleware = (e : Error, req : Request, res : Response, next : NextFunction) => {
    if(e instanceof ZodError) {
        res.status(400).json({
            error : `Validation Error : ${JSON.stringify(e)}`
        })
    }
    else if(e instanceof ResponseError) {
        res.status(e.status).json({
            error : e.message
        }) 
    } else {
        res.status(500).json({
            error : e.message
        })
    }
}
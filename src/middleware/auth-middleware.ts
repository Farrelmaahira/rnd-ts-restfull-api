import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt"
import { prisma } from "../application/db";
import { UserRequest } from "../type/user-type";

declare module "express-serve-static-core" {
    interface Request {
        user: UserRequest
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const tokenAsBearer: string = req.headers.authorization as string;

    if (tokenAsBearer == null) {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }

    const token: string = tokenAsBearer?.split(' ')[1]

    const validateToken = bcrypt.compareSync('api-token', token);

    if (validateToken === false) {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }

    const user: UserRequest = await prisma.user.findFirst({
        where: {
            token: token
        }
    }) as UserRequest

    if (user === null) {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }

    req.user = {
        id: user.id,
        email: user?.email,
        username: user?.username,
        role: user?.role,
        status: user?.status
    }

    next();
}
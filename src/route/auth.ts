import express, { Response, Request, NextFunction } from "express";
import { AuthController } from "../controller/authController";

export const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);




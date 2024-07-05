import express from "express";
import { UserController } from "../controller/userController";
export const router = express.Router();


router.get('/users', UserController.get);
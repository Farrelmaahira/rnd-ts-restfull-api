import express from "express";
import { UserController } from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";
export const router = express.Router();

router.use(authMiddleware);
router.get('/', UserController.get);
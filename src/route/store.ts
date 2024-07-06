import express from "express"
import { StoreController } from "../controller/store-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export const router = express.Router();
router.use(authMiddleware);
router.put('/request-open', StoreController.requestOpen);
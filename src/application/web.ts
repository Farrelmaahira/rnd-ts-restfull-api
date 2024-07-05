import express from "express"
import { router as authRouter } from "../route/auth"; 
import { router as userRouter } from "../route/user";
import { errorMiddleware } from "../middleware/error-handler";

export const web = express();
web.use(express.json());
web.use(authRouter);
web.use(userRouter);
web.use(errorMiddleware)

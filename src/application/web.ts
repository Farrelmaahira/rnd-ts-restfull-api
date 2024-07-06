import express from "express"
import { router as authRouter } from "../route/auth"; 
import { router as userRouter } from "../route/user";
import { router as storeRouter } from "../route/store";
import { errorMiddleware } from "../middleware/error-handler";

export const web = express();
web.use(express.json());
web.use('/api/v1/auth', authRouter);
web.use('/api/v1/users', userRouter);
web.use('/api/v1/stores', storeRouter);
web.use(errorMiddleware)

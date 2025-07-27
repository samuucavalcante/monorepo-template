import { Router } from "express";
import authRouter from "@modules/auth/auth.routes";
import userRouter from "@modules/user/user.routes";
import type { User } from "shared";

const appRouter = Router();

appRouter.use("/api", authRouter, userRouter);

export { appRouter };

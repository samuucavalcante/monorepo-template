import { Router } from "express";
import authRouter from "@modules/auth/auth.routes";
import userRouter from "@modules/user/user.routes";
import { mongoose } from "@shared/mongo";

const appRouter = Router();

const routes = [authRouter, userRouter];

appRouter.use("/api", routes);

appRouter.get("/api/health", (_, res) => {
  res
    .status(200)
    .json({ success: true, dbStatus: mongoose.connection.readyState });
});

export { appRouter };

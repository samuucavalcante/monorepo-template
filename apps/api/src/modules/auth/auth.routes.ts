import { Router } from "express";

// plop-import
import { AuthRegisterController } from './useCases/register/auth.register.controller'
import { AuthLoginController } from "./useCases/login/auth.login.controller";

// plop-instance
const authRegisterController = new AuthRegisterController()
const authLoginController = new AuthLoginController();

const authRouter = Router();

// plop-route
authRouter.post("/auth/register", authRegisterController.handler);
authRouter.post("/auth/login", authLoginController.handler);

export default authRouter;

import { Router } from "express";

// plop-import
import { UserUpdateMeController } from "./useCases/updateMe/user.updateMe.controller";
import { UserGetMeController } from "./useCases/getMe/user.getMe.controller";
import { ensureAuthenticatedMiddleware } from "@shared/middlewares/ensureAuthenticated.middleware";

// plop-instance
const userUpdateMeController = new UserUpdateMeController();
const userGetMeController = new UserGetMeController();

const userRouter = Router();

// plop-route
userRouter.get(
  "/user/get-me",
  ensureAuthenticatedMiddleware,
  userGetMeController.handler
);

userRouter.patch(
  "/user/update-me",
  ensureAuthenticatedMiddleware,
  userUpdateMeController.handler
);

export default userRouter;

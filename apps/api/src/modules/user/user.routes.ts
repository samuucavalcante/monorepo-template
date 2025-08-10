import { Router } from "express";

// plop-import
import { UserReadListController } from "./useCases/readList/user.readList.controller";
import { UserUpdateMeController } from "./useCases/updateMe/user.updateMe.controller";
import { UserGetMeController } from "./useCases/getMe/user.getMe.controller";
import { ensureAuthenticatedMiddleware } from "@shared/middlewares/ensureAuthenticated.middleware";

// plop-instance
const userReadListController = new UserReadListController();
const userUpdateMeController = new UserUpdateMeController();
const userGetMeController = new UserGetMeController();

const userRouter = Router();

// plop-route
userRouter.get("/user", userReadListController.handler);

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

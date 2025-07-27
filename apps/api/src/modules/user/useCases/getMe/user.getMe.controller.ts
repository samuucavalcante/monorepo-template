import type { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { UserGetMeUseCase } from "./user.getMe.useCase";

export class UserGetMeController {
  async handler(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const userId = req.userId;
    const userGetMeUseCase = container.resolve(UserGetMeUseCase);
    const result = await userGetMeUseCase.execute({ userId });

    res.status(200).json(result);
  }
}

import type { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { UserUpdateMeUseCase } from "./user.updateMe.useCase";

export class UserUpdateMeController {
  async handler(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const userUpdateMeUseCase = container.resolve(UserUpdateMeUseCase);
    const result = await userUpdateMeUseCase.execute({
      userId: req.userId,
      user: req.body,
    });

    res.status(200).json(result);
  }
}

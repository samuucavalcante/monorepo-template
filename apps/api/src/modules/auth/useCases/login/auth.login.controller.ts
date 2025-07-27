import type { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { AuthLoginUseCase } from "./auth.login.useCase";

export class AuthLoginController {
  async handler(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const dto = req.body;
    const authLoginUseCase = container.resolve(AuthLoginUseCase);
    const result = await authLoginUseCase.execute(dto);

    res.status(200).json(result);
  }
}

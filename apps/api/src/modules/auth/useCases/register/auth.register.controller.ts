import type { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { AuthRegisterUseCase } from "./auth.register.useCase";

export class AuthRegisterController {
  async handler(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const dto = req.body;
    const authRegisterUseCase = container.resolve(AuthRegisterUseCase);
    const result = await authRegisterUseCase.execute(dto);

    res.status(200).json(result);
  }
}

import type { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { TestCreateUseCase } from "./test.create.useCase";

export class TestCreateController {
  async handler(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const testCreateUseCase = container.resolve(TestCreateUseCase);
    const result = await testCreateUseCase.execute({});

    res.status(200).json(result);
  }
}

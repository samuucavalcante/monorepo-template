import type { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { UserReadListUseCase } from "./user.readList.useCase";
import type { UserReadListDto } from "arc/user/useCases";

export class UserReadListController {
  async handler(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const query = req.query as unknown as UserReadListDto;
    const userReadListUseCase = container.resolve(UserReadListUseCase);
    const result = await userReadListUseCase.execute(query);

    res.status(200).json(result);
  }
}

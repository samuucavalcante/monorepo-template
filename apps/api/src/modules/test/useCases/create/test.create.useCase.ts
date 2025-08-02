import { injectable } from "tsyringe"
import type { TestCreateDto, TestCreateReturns  } from "arc/test/useCases"

@injectable()
export class TestCreateUseCase {
  constructor() {}

  async execute(dto: TestCreateDto): Promise<TestCreateReturns> {
    void this.validateParams(dto)
    throw new Error("Not Implemented")
  }

   private validateParams(dto: TestCreateDto): void {
    throw new Error("Not Implemented")
  }
}

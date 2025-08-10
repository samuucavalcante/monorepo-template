import { injectable, inject } from "tsyringe";
import { UserRepository } from "@modules/user/repositories/user.repository";
import type { UserReadListDto, UserReadListReturns } from "arc/user/useCases";

@injectable()
export class UserReadListUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async execute(dto: UserReadListDto): Promise<UserReadListReturns> {
    const [list, count] = await Promise.all([
      this.userRepository.readList(dto),
      this.userRepository.count(dto),
    ]);

    return {
      list,
      count,
    };
  }
}

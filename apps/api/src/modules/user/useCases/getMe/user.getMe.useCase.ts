import { inject, injectable } from "tsyringe";
import type { UserGetMeDto, UserGetMeReturns } from "./user.getMe.dto";
import { UserRepository } from "@modules/user/repository/user.repository";
import { AppError } from "@shared/error";

@injectable()
export class UserGetMeUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async execute(dto: UserGetMeDto): Promise<UserGetMeReturns> {
    const user = await this.userRepository.findById(dto.userId);

    if (!user) throw new AppError("Usuário não existe", 400);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword };
  }
}

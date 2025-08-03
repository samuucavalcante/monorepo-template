import { inject, injectable } from "tsyringe";
import type { UserUpdateMeDto, UserUpdateMeReturns } from "./user.updateMe.dto";
import { UserRepository } from "@modules/user/repositories/user.repository";
import { AppError } from "@shared/error";

@injectable()
export class UserUpdateMeUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async execute(dto: UserUpdateMeDto): Promise<UserUpdateMeReturns> {
    const user = await this.userRepository.findById(dto.userId);

    if (!user) throw new AppError("Usuário nao encontrado", 400);

    const isChangedEmail = dto.user.email && dto.user.email !== user.email;

    if (isChangedEmail) {
      const userWithSameEmail = await this.userRepository.findByEmail(
        dto.user.email
      );
      if (userWithSameEmail) throw new AppError("Email ja cadastrado", 400);
    }

    const updatedUser = await this.userRepository.update(dto.userId, dto.user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWihtoutPassword } = updatedUser;

    return { user: userWihtoutPassword };
  }
}

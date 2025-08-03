import { inject, injectable } from "tsyringe";
import type { AuthLoginDto, AuthLoginReturns } from "arc/auth/useCases";
import { UserRepository } from "@modules/user/repositories/user.repository";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { AppError } from "@shared/error";

@injectable()
export class AuthLoginUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async execute(dto: AuthLoginDto): Promise<AuthLoginReturns> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) throw new AppError("Credencias inválidas", 400);

    const passwordMatched = await argon2.verify(user.password, dto.password);

    if (!passwordMatched) throw new AppError("Credencias inválidas", 400);

    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign({ userId: user._id }, process.env.JWT_WEB_TOKEN!, {
      algorithm: "HS256",
    });

    return {
      user: userWithoutPassword,
      token,
    };
  }
}

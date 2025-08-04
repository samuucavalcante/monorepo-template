import { inject, injectable } from "tsyringe";
import { UserRepository } from "@modules/user/repositories/user.repository";
import { AppError } from "@shared/error";
import { AuthLoginUseCase } from "@modules/auth/useCases/login/auth.login.useCase";
import argon2 from "argon2";
import type { AuthRegisterDto, AuthRegisterReturns } from "arc/auth/useCases";

@injectable()
export class AuthRegisterUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,
    @inject(AuthLoginUseCase)
    private readonly authLoginUseCase: AuthLoginUseCase
  ) {}

  async execute(dto: AuthRegisterDto): Promise<AuthRegisterReturns> {
    let user = await this.userRepository.findByEmail(dto.email);

    if (user) {
      throw new AppError({
        message: "Email already exists",
        messagePt: "Email já cadastrado",
      });
    }

    const passwordHash = await argon2.hash(dto.password);

    user = await this.userRepository.create({
      email: dto.email,
      name: dto.name,
      password: passwordHash,
    });

    const authLoginUserCase = await this.authLoginUseCase.execute({
      email: dto.email,
      password: dto.password,
    });

    return authLoginUserCase;
  }
}

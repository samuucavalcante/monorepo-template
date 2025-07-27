import type { User } from "@modules/user/interfaces/user";

export interface AuthRegisterDto {
  email: string;
  name: string;
  password: string;
}

export interface AuthRegisterReturns {
  user: Omit<User, "password">;
  token: string;
}

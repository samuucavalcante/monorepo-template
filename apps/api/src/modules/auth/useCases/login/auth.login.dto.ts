import type { User } from "@modules/user/interfaces/user";

export interface AuthLoginDto {
  email: string;
  password: string;
}

export interface AuthLoginReturns {
  user: Omit<User, "password">;
  token: string;
}

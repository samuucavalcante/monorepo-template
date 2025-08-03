import { User } from "@/modules/user/interfaces/user.interface";

export interface AuthLoginDto {
  email: string;
  password: string;
}

export interface AuthLoginReturns {
  user: Omit<User, "password">;
  token: string;
}

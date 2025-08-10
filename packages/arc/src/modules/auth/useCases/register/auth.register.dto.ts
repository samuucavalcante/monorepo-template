import { User } from "arc/modules/user/entities";

export interface AuthRegisterDto {
  email: string;
  name: string;
  password: string;
}

export interface AuthRegisterReturns {
  user: Omit<User, "password">;
  token: string;
}

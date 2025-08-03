import { User } from "@/modules/user/interfaces/user.interface";

export interface AuthRegisterDto {
  email: string;
  name: string;
  password: string;
}

export interface AuthRegisterReturns {
  user: Omit<User, "password">;
  token: string;
}

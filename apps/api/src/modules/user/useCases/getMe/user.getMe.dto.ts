import type { User } from "@modules/user/interfaces/user";

export interface UserGetMeDto {
  userId: string;
}

export interface UserGetMeReturns {
  user: Omit<User, "password">;
}

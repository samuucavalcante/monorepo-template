import type { User } from "@modules/user/interfaces/user";

export interface UserUpdateMeDto {
  userId: string;
  user: Partial<Omit<User, "password" | "createdAt" | "updatedAt">>;
}

export interface UserUpdateMeReturns {
  user: Omit<User, "password">;
}

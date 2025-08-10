import { User } from "arc/modules/user/entities";

export interface UserUpdateMeDto {
  userId: string;
  user: Partial<Omit<User, "password" | "createdAt" | "updatedAt">>;
}

export interface UserUpdateMeReturns {
  user: Omit<User, "password">;
}

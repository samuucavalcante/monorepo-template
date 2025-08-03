import { User } from "@/modules/user/interfaces";

export interface UserUpdateMeDto {
  userId: string;
  user: Partial<Omit<User, "password" | "createdAt" | "updatedAt">>;
}

export interface UserUpdateMeReturns {
  user: Omit<User, "password">;
}

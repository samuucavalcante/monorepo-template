import { User } from "@/modules/user/interfaces";

export interface UserGetMeDto {
  userId: string;
}

export interface UserGetMeReturns {
  user: Omit<User, "password">;
}

import { User } from "arc/modules/user/entities";

export interface UserGetMeDto {
  userId: string;
}

export interface UserGetMeReturns {
  user: Omit<User, "password">;
}

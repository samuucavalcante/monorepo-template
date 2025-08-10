import { User } from "arc/modules/user/entities";
import { IReadListDTO } from "arc/shared";

export type UserReadListDto = IReadListDTO & {
  query: string;
};

export type UserReadListReturns = {
  list: User[];
  count: number;
};

"use server";
import { requester } from "@/shared/utils/requester";
import { ResponseApi } from "arc/shared";

import type { UserReadListDto, UserReadListReturns } from "arc/user/useCases";

export async function userReadList(
  params?: UserReadListDto
): Promise<ResponseApi<UserReadListReturns>> {
  try {
    const response = await requester.get<ResponseApi<UserReadListReturns>>(
      "/user",
      {
        params,
      }
    );

    const dataResponse =
      (await response.json()) as ResponseApi<UserReadListReturns>;

    return dataResponse;
  } catch (error) {
    return error as ResponseApi<UserReadListReturns>;
  }
}

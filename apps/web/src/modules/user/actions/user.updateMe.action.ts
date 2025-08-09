"use server";
import { requester } from "@/shared/utils/requester";
import { ResponseApi } from "arc/shared";
import { UserUpdateMeDto, UserUpdateMeReturns } from "arc/user/useCases";

export async function userUpdateMe(
  params: UserUpdateMeDto
): Promise<ResponseApi<UserUpdateMeReturns>> {
  try {
    const response = await requester.post<ResponseApi<UserUpdateMeReturns>>(
      "/user/update-me",
      {
        body: params,
      }
    );

    const dataResponse =
      (await response.json()) as ResponseApi<UserUpdateMeReturns>;

    return dataResponse;
  } catch (error) {
    return error as ResponseApi<UserUpdateMeReturns>;
  }
}

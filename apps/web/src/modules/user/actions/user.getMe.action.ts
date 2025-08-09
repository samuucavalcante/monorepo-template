"use server";
import { requester } from "@/shared/utils/requester";
import { ResponseApi } from "arc/shared";
import { UserGetMeDto, UserGetMeReturns } from "arc/user/useCases";

export async function userGetMe(
  params: UserGetMeDto
): Promise<ResponseApi<UserGetMeReturns>> {
  try {
    const response = await requester.post<ResponseApi<UserGetMeReturns>>(
      "/user/get-me",
      {
        body: params,
      }
    );

    const dataResponse =
      (await response.json()) as ResponseApi<UserGetMeReturns>;

    return dataResponse;
  } catch (error) {
    return error as ResponseApi<UserGetMeReturns>;
  }
}

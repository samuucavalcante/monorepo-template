"use server";

import { requester } from "@/shared/utils/requester";
import { AuthRegisterDto, AuthRegisterReturns } from "arc/auth/useCases";
import { ResponseApi } from "arc/shared";
import { cookies } from "next/headers";

export async function authRegister(
  data: AuthRegisterDto
): Promise<ResponseApi<AuthRegisterReturns>> {
  try {
    const response = await requester.post<ResponseApi<AuthRegisterReturns>>(
      "/auth/register",
      {
        body: data,
      }
    );

    const dataResponse =
      (await response.json()) as ResponseApi<AuthRegisterReturns>;

    const authData = dataResponse.data;

    Object.entries(authData).forEach(([key, value]) => {
      cookies().then((cookie) =>
        cookie.set(
          key,
          typeof value === "string" ? value : JSON.stringify(value)
        )
      );
    });

    return await response.json();
  } catch (error) {
    return error as ResponseApi<AuthRegisterReturns>;
  }
}

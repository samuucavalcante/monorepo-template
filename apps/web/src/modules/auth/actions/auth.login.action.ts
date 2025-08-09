"use server";

import { requester } from "@/shared/utils/requester";
import { AuthLoginDto, AuthLoginReturns } from "arc/auth/useCases";
import { ResponseApi } from "arc/shared";
import { cookies } from "next/headers";

export async function authLogin(
  data: AuthLoginDto
): Promise<ResponseApi<AuthLoginReturns>> {
  try {
    const response = await requester.post<ResponseApi<AuthLoginReturns>>(
      "/auth/login",
      {
        body: data,
      }
    );

    const dataResponse =
      (await response.json()) as ResponseApi<AuthLoginReturns>;

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
    return error as ResponseApi<AuthLoginReturns>;
  }
}

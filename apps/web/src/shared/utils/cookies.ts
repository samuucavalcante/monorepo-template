"use server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function getCookie<T>(name: string): Promise<T> {
  const data = (await cookies()).get(name)?.value;

  const isJSON =
    typeof data === "string" && data.startsWith("{") && data.endsWith("}");

  if (isJSON) return JSON.parse(data) as T;

  return data as T;
}

export async function setCookie(
  name: string,
  value: string,
  options: Partial<ResponseCookie> = {}
) {
  return (await cookies()).set(name, value, {
    path: "/",
    httpOnly: true,
    ...options,
  });
}

export async function deleteCookie(name: string) {
  (await cookies()).delete(name);
}

export async function parseSetCookie(headers: string | string[]) {
  if (!headers) return [];

  const cookiesArray = Array.isArray(headers) ? headers : [headers];

  return cookiesArray.map((cookieStr) => {
    const parts = cookieStr.split(/;\s*/);

    const [nameValue, ...paramPairs] = parts;
    const [name, value] = nameValue.split("=");

    const params: Record<string, string | number | boolean | Date> = {};
    for (const param of paramPairs) {
      const [key, val] = param.split("=");

      if (!val) {
        params[key.toLowerCase()] = true; // Flags like HttpOnly will be true
      } else if (!isNaN(Number(val))) {
        params[key.toLowerCase()] = Number(val); // Convert numeric values
      } else if (Date.parse(val)) {
        params[key.toLowerCase()] = new Date(val); // Convert date values
      } else {
        params[key.toLowerCase()] = val; // Keep as string
      }
    }

    return { name, value, params };
  });
}

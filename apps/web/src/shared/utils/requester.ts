"use server";

import {
  headers as serverHeaders,
  cookies as serverCookies,
} from "next/headers";

import { ENV } from "@/shared/constants/env";

type RequesterMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type RequesterBody = string | object | FormData | null;
type RequesterHeaders = Record<string, string>;

export type RequesterResponse<R = unknown> = Response & { data: R };

interface FetchOptions {
  body?: RequesterBody;
  headers?: RequesterHeaders;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
}

export async function requester<R = unknown>(
  method: RequesterMethod,
  path: string,
  options?: FetchOptions
): Promise<RequesterResponse<R>> {
  const { body, headers = {}, cache, params = {}, next } = options || {};

  const serverHeadersList = serverHeaders();
  const serverCookiesList = serverCookies();
  const contentType = getContentType(body);

  const parsedBody =
    typeof body === "object" ? JSON.stringify(body) : (body as string);

  if (!!contentType) headers["Content-Type"] = contentType;
  headers["origin"] = (await serverHeadersList).get("origin") || "";

  const token = (await serverCookiesList).get("token")?.value;
  if (token) {
    headers["Cookie"] = `token=${token}`;
  }
  let fullPath = path;

  if (!fullPath.startsWith("http"))
    fullPath = `${ENV.NEXT_PUBLIC_API_URL}${path}`;
  fullPath = fullPath.replace(/\/\//g, "/");
  fullPath += mountQueryParams(params);
  const response = await fetch(fullPath, {
    method,
    body: parsedBody,
    headers,
    cache,
    next,
    credentials: "include",
  });

  if (!response.ok) throw await treatError(response);

  return response as RequesterResponse<R>;
}

function getContentType(body?: RequesterBody): string | undefined {
  if (typeof body === "string") return "text/plain";

  const isFormData = body instanceof FormData;

  if (typeof body === "object" && !isFormData) return "application/json";

  return undefined;
}

function mountQueryParams(params: Record<string, unknown>) {
  Object.keys(params).forEach(
    (key) => params[key] === undefined && delete params[key]
  );

  const query: string[] = [];

  Object.entries(params).forEach(([key, value]) =>
    Array.isArray(value)
      ? value.forEach((i) => query.push(`${key}=${encodeURIComponent(i)}`))
      : query.push(`${key}=${encodeURIComponent(String(value))}`)
  );

  if (query.length === 0) return "";

  return "?" + query.join("&");
}

/* async function treatResponse<R = unknown>(r: Response) {
	const response = r as RequesterResponse<R>;

	if (response.body === null) return response;
	let data = null;

	try {
		const contentType = response.headers.get("content-type");

		if (!contentType) return response;

		const type = contentType.split(";")[0];

		if (type === "application/json") data = await response.json();
		if (type === "text/plain") data = await response.text();

		Object.assign(response, { data });

		return response;
	} catch (error) {
		throw error;
	}
} */

async function treatError(response: Response) {
  const contentType = response.headers.get("Content-Type");

  if (contentType === "application/json") {
    throw parseErrorToApiError(await response.json());
  }

  throw parseErrorToApiError(await response.text());
}

function parseErrorToApiError(error: string | Record<string, string>) {
  let errorData = typeof error === "object" && error;

  if (typeof error === "string") {
    try {
      errorData = JSON.parse(error);
    } catch {
      return error;
    }
  }

  return !errorData ? error : errorData;
}

requester.get = function <R = unknown>(path: string, options?: FetchOptions) {
  return requester<R>("GET", path, options);
};

requester.post = function <R = unknown>(path: string, options?: FetchOptions) {
  return requester<R>("POST", path, options);
};

requester.put = function <R = unknown>(path: string, options?: FetchOptions) {
  return requester<R>("PUT", path, options);
};

requester.patch = function <R = unknown>(path: string, options?: FetchOptions) {
  return requester<R>("PATCH", path, options);
};

requester.delete = function <R = unknown>(
  path: string,
  options?: FetchOptions
) {
  return requester<R>("DELETE", path, options);
};

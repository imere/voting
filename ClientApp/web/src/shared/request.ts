import { ALLOWED_ORIGINS, API_ORIGIN } from "./conf";

export async function addAuthorization(init: RequestInit) {
  const user = await import("@/actions").then(({ iu }) =>  iu.getUser());
  if (user) {
    if (!init.headers) {
      init.headers = {};
    }
    Reflect.set(init.headers, "Authorization", `${user.token_type} ${user.access_token}`);
  }
}

export function addCredentials(init: RequestInit) {
  init.credentials = "include";
}

export function addCORS(init: RequestInit) {
  init.mode = "cors";
}

export function shouldCORS(url: string) {
  return !url.startsWith("/") && !url.startsWith(window.location.origin);
}

export function shouldAddAuthorization(url: string) {
  return url.startsWith(API_ORIGIN);
}

export function shouldAddCredentials(url: string) {
  return ALLOWED_ORIGINS.some((origin) => url.startsWith(origin));
}

type FetchType = (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

const request: FetchType = async (input, init = {}) => {
  const { method = "GET" } = init;
  init.method = method;

  let url: string;
  if ("string" === typeof input) {
    url = input;
  } else {
    url = input.url;
  }

  if (shouldCORS(url)) {
    addCORS(init);
  }

  if (shouldAddCredentials(url)) {
    addCredentials(init);
  }

  if (shouldAddAuthorization(url)) {
    await addAuthorization(init);
  }

  return await fetch(input, init);
};

export default request;

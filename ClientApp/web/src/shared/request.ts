import { iu } from "@/actions";

import { ALLOWED_ORIGINS, API_ORIGIN } from "./conf";

type FetchType = (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

const request: FetchType = async (input, init = {}) => {
  function shouldCORS(url: string) {
    return !url.startsWith("/") && !url.startsWith(window.location.origin);
  }

  function shouldAddAuthorization() {
    return "string" === typeof input && input.startsWith(API_ORIGIN);
  }

  async function addAuthorization(init: RequestInit) {
    const user = await iu.getUser();
    if (user) {
      if (!init.headers) {
        init.headers = {};
      }
      Reflect.set(init.headers, "Authorization", `${user.token_type} ${user.access_token}`);
    }
  }

  function shouldAddCredentials(url: string) {
    return ALLOWED_ORIGINS.some((origin) => url.startsWith(origin));
  }

  function addCredentials(url: string, init: RequestInit) {
    if (ALLOWED_ORIGINS.some((origin) => url.startsWith(origin))) {
      init.credentials = "include";
    } else {
      init.credentials = "same-origin";
    }
  }

  const { method = "GET" } = init;
  init.method = method;

  let url: string;
  if ("string" === typeof input) {
    url = input;
  } else {
    url = input.url;
  }

  if (shouldCORS(url)) {
    init.mode = "cors";
  }

  if (shouldAddCredentials(url)) {
    addCredentials(url, init);
  }

  if (shouldAddAuthorization()) {
    await addAuthorization(init);
  }

  return await fetch(input, init);
};

export default request;

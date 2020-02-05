import useFetch, { UseFetch } from "use-http";

import { iu } from "@/actions";
import { ALLOWED_ORIGINS, API_ORIGIN } from "@/shared";

type CustomFetchType = (input: string, init?: RequestInit | undefined) => UseFetch<any>;

const useHttp: CustomFetchType = (input, init = {}) => {
  function shouldCORS() {
    return !input.startsWith("/") && !input.startsWith(window.location.origin);
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

  if (shouldCORS()) {
    init.mode = "cors";
  } else {
    init.mode = "no-cors";
  }

  if (shouldAddCredentials(input)) {
    addCredentials(input, init);
  }

  if (shouldAddAuthorization()) {
    addAuthorization(init);
  }

  return useFetch(input, init);
};

export { useHttp };

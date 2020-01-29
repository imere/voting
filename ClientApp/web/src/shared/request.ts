import { iu } from "@/actions";

export const API_ORIGIN = "http://localhost:61598";
export const API_USER = `${API_ORIGIN}/api/user`;
export const API_POLL = `${API_ORIGIN}/api/v1/poll`;

const ALLOWED_ORIGINS = [API_ORIGIN];

type FetchType = (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

const request: FetchType = async (input, init = {}) => {
  function shouldCORS() {
    if ("string" === typeof input) {
      return !input.startsWith("/") && !input.startsWith(window.location.origin);
    } else {
      return true;
    }
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

  function addCredentials(url: string) {
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

  if (shouldCORS()) {
    init.mode = "cors";
  }

  if (shouldAddCredentials(url)) {
    addCredentials(url);
  }

  if (shouldAddAuthorization()) {
    await addAuthorization(init);
    return await fetch(input, init);
  }

  return await fetch(input, init);
};

export default request;

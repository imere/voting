import useFetch, { UseFetch } from "use-http";

import {
  addAuthorization,
  addCORS,
  addCredentials,
  shouldAddAuthorization,
  shouldAddCredentials,
  shouldCORS,
} from "@/shared/request";

// type CustomFetchType = (input: string, init?: RequestInit | undefined) => UseFetch<any>;

function useHttp<T = any>(input: string, init: RequestInit = {}): UseFetch<T> {
  if (shouldCORS(input)) {
    addCORS(init);
  }

  if (shouldAddCredentials(input)) {
    addCredentials(init);
  }

  if (shouldAddAuthorization(input)) {
    addAuthorization(init);
  }

  return useFetch<T>(input, init);
}

export { useHttp };

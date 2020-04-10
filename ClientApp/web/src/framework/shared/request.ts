import { AUTHORIZATION_ALLOWED_URLS, CREDENTIAL_ALLOWED_URLS } from './api/questionnaire';

export async function addAuthorization(init: RequestInit) {
  const user = await import('@/store/actions').then(({ iu }) =>  iu.getUser());
  if (user) {
    if (!init.headers) {
      init.headers = {};
    }
    Reflect.set(init.headers, 'Authorization', `${user.token_type} ${user.access_token}`);
  }
}

export function addCredentials(init: RequestInit) {
  init.credentials = 'include';
}

export function addCORS(init: RequestInit) {
  init.mode = 'cors';
}

export function shouldCORS(url: string) {
  return !url.startsWith('/') && !url.startsWith(window.location.origin);
}

// TODO add logic using `control.methods`
export function shouldAddAuthorization(url: string) {
  return AUTHORIZATION_ALLOWED_URLS.
    some((control) => control.matchers.
      some((origin) => url.startsWith(origin))
    );
}

// TODO add logic using `control.methods`
export function shouldAddCredentials(url: string) {
  return CREDENTIAL_ALLOWED_URLS.
    some((control) => control.matchers.
      some((origin) => url.startsWith(origin))
    );
}

type FetchType = (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

const request: FetchType = async (input, init = {}) => {
  const { method = 'GET' } = init;
  init.method = method;

  let url: string;
  if (typeof input === 'string') {
    url = input;
  } else {
    url = input.url;
  }

  if (shouldCORS(url)) {
    addCORS(init);
  } else {
    init.mode = 'no-cors';
  }

  if (shouldAddCredentials(url)) {
    addCredentials(init);
  } else {
    init.credentials = 'omit';
  }

  if (shouldAddAuthorization(url)) {
    await addAuthorization(init);
  }

  return await fetch(input, init);
};

export default request;

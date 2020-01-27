type FetchType =  (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

const request:FetchType = (input, init = {}) => {
  const method = init.method ?? "GET";
  init.method = method;
  return fetch(input, init);
};

export default request;

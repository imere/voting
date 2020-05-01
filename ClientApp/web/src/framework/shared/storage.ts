export const sget = (key: string) => window.sessionStorage.getItem(key);

export const sset = (key: string, value: string) => window.sessionStorage.setItem(key, value);

export const sremove = (key: string) => window.sessionStorage.removeItem(key);

export const sclear = () => window.sessionStorage.clear();

export const lget = (key: string) => window.localStorage.getItem(key);

export const lset = (key: string, value: string) => window.localStorage.setItem(key, value);

export const lremove = (key: string) => window.localStorage.removeItem(key);

export const lclear = () => window.localStorage.clear();

export const sget = (key: string) => sessionStorage.getItem(key);

export const sset = (key: string, value: string) => sessionStorage.setItem(key, value);

export const sremove = (key: string) => sessionStorage.removeItem(key);

export const sclear = () => sessionStorage.clear();

export const lget = (key: string) => localStorage.getItem(key);

export const lset = (key: string, value: string) => localStorage.setItem(key, value);

export const lremove = (key: string) => localStorage.removeItem(key);

export const lclear = () => localStorage.clear();

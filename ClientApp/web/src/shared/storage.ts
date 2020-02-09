const sget = (key: string) => sessionStorage.getItem(key);

const sset = (key: string, value: string) => sessionStorage.setItem(key, value);

const sremove = (key: string) => sessionStorage.removeItem(key);

const sclear = () => sessionStorage.clear();

const lget = (key: string) => localStorage.getItem(key);

const lset = (key: string, value: string) => localStorage.setItem(key, value);

const lremove = (key: string) => localStorage.removeItem(key);

const lclear = () => localStorage.clear();

export default {
  sget,
  sset,
  sremove,
  sclear,
  lget,
  lset,
  lremove,
  lclear,
};

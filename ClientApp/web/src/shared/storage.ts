const sget = (key: string) => sessionStorage.getItem(key);

const sset = (key: string, value: string) => sessionStorage.setItem(key, value);

const sremove = (key: string) => sessionStorage.removeItem(key);

const sclear = () => sessionStorage.clear();

export default { sget, sset, sremove, sclear };

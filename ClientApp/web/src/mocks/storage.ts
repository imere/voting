export const localStorage = {
  items: new Map(),
  getItem: function (key: string) {
    this.items.get(key);
  },
  setItem: function (key: string, value: any) {
    this.items.set(key, String.toString.call(value));
  },
  removeItem: function (key: string) {
    this.items.delete(key);
  },
  clear: function () {
    this.items.clear();
  },
};

export const sessionStorage = localStorage;

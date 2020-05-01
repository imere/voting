export const wrapSetState: (setState: React.Dispatch<React.SetStateAction<any>>) => (key: string, value: any, setter: Function) =>  void = function (setState) {
  return function wrappedSetState(key, value, setter) {
    let v = value;
    if (typeof value === 'function') {
      setState((prev: any) => v = value(prev));
    } else {
      setState(value);
    }
    setter(key, JSON.stringify(v));
  };
};

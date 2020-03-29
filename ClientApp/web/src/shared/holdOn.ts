/**
 * Return a function that returns given param
 */
export function holdOn<T = any>(returnValue?: T) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (..._args: any): any {
    if (typeof returnValue !== "undefined") {
      return returnValue;
    }
  };
}

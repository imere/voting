export function polyfill() {
  Reflect.defineProperty(RegExp.prototype, 'toJSON', {
    value: function (this: RegExp) {
      return this.toString();
    }
  });
}

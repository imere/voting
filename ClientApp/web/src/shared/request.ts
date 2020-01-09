export class Http {
  static get(url: string): Promise<any> {
    return Promise.resolve(1);
  }
  static post(url: string): Promise<any> {
    return Promise.resolve(2);
  }
  static put(url: string): Promise<any> {
    return Promise.resolve(3);
  }
  static del(url: string): Promise<any> {
    return Promise.resolve(4);
  }
}

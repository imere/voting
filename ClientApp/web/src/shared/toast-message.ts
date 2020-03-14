import { message } from "antd";

export function toastMessageByStatus(status?: number, omit: number[] = []): void {
  if (omit.includes(status as number)) {
    return;
  }
  switch (status) {
  case 200:
  case 201:
  case 204:
    break;
  case 401:
    message.error("登录过期");
    break;
  case 403:
    message.error("无权访问");
    break;
  case 400:
    message.error("请求错误");
    break;
  case 500:
    message.error("加载错误");
    break;
  case null:
  case undefined:
    break;
  default:
    console.debug("Unhandled", status);
  }
}

import { message } from "antd";

export function toastMessageByStatus(status: number, omit: number[] = []) {
  if (omit.includes(status)) {
    return;
  }
  switch (status) {
  case 401:
    message.error("登录过期");
    break;
  case 400:
  case 500:
    message.error("加载错误");
    break;
  default:
    console.debug(status);
  }
}

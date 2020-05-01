import { Routes } from '@/constants';

export const RouteNameMap: {[key: string]: string} = new Proxy({
  '/': '首页',
  [Routes.ACCOUNT_CENTER]: '个人中心',
  [Routes.ACCOUNT_SETTINGS]: '个人设置',
  [Routes.POLL_LIST]: '问卷列表',
  [Routes.POLL_NEW]: '创建问卷',
  [Routes.POLL_ANSWER.split('/:')[0]]: '回答问卷',
  [Routes.POLL_EDIT.split('/:')[0]]: '编辑问卷',
  [Routes.POLL_STATISTIC.split('/:')[0]]: '结果统计',
}, {
  get(target, p, receiver) {
    const value = Reflect.get(target, p, receiver);
    if (typeof value === 'undefined') {
      return '';
    }
    return value;
  }
});

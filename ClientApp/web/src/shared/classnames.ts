import { None } from '@/typings/types';

export function classnames(...rest: Array<string | None>) {
  return [...rest].filter((name) => name).join(' ');
}

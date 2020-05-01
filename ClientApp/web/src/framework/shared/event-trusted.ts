export function eventTrusted(ev: Event): boolean {
  if (typeof ev.isTrusted === 'boolean') {
    return ev.isTrusted;
  }
  return true;
}

import { nameMap, routeNameMap } from './util';

test('Get correct name with configured route', () => {
  const keys = Object.keys(nameMap);
  for (const key of keys) {
    expect(nameMap[key]).toStrictEqual(routeNameMap[key]);
  }
});

test('Get empty name with not configured route', () => {
  expect(routeNameMap['not configured']).toStrictEqual('');
});

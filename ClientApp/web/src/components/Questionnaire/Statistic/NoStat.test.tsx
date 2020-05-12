import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { NoStat } from './NoStat';

test('NoStat renders', () => {
  const { getByText } = render(
    <NoStat />
  );
  expect(getByText('暂无统计方式')).toBeInTheDocument();
});

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/store';

import Sider from './index';

test('Sider renders', () => {
  const { getByText } = render(
    <ReduxProvider store={store}>
      <Sider
        collapsed={false}
      >
        children
      </Sider>
    </ReduxProvider>
  );

  expect(getByText('children')).toBeInTheDocument();
});

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/store';

import SideMenuLayout from './index';

test('SideMenuLayout renders header and content', () => {
  const { getByText } = render(
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Route path="/">
          <SideMenuLayout
            collapsed={false}
            header={'header'}
            content={'content'}
          />
        </Route>
      </BrowserRouter>
    </ReduxProvider>
  );
  expect(getByText('header')).toBeInTheDocument();
  expect(getByText('content')).toBeInTheDocument();
});


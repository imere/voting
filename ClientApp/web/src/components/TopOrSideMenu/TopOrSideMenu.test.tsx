import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/store';
import { requestLoginSuc, requestLogoutComplete } from '@/store/actions/auth';

import TopOrSideMenu from './index';
import { getUser } from '@/mocks/user';
import { User } from 'oidc-client';

afterAll(() => {
  store.dispatch(requestLogoutComplete());
});

test('TopOrSideMenu renders common content', () => {
  const { getByText, queryByText } = render(
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Route path="/">
          <TopOrSideMenu
            mode="horizontal"
          />
        </Route>
      </BrowserRouter>
    </ReduxProvider>
  );

  expect(getByText('问卷列表')).toBeInTheDocument();
  expect(queryByText('个人')).toBe(null);
});

test('TopOrSideMenu renders authenticated content', () => {
  store.dispatch(requestLoginSuc(getUser() as unknown as User));

  const { getByText } = render(
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Route path="/">
          <TopOrSideMenu
            mode="horizontal"
          />
        </Route>
      </BrowserRouter>
    </ReduxProvider>
  );

  expect(getByText('问卷列表')).toBeInTheDocument();
  expect(getByText('个人')).toBeInTheDocument();
});

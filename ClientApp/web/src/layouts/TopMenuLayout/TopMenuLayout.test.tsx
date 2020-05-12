import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/store';

import TopMenuLayout from './index';

test('TopMenuLayout renders header and content', () => {
  const { getByText } = render(
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Route path="/">
          <TopMenuLayout
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

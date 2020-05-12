import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Content from './index';

test('Content renders children', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Route path="/">
        <Content>
          a text
        </Content>
      </Route>
    </BrowserRouter>
  );
  expect(getByText('a text')).toBeInTheDocument();
});


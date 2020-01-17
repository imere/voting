import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FooterComponent from './index';

test('renders copyright', () => {
  const { getByText } = render(React.createElement(FooterComponent));
  const ele = getByText('Voting System ©2020 Created by ime');
  expect(ele).toBeInTheDocument();
});

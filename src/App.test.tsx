import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('Elements render', () => {
    const { queryByTestId } = render(<App />);

    const appContainer = queryByTestId('app-container');
    expect(appContainer).toBeInTheDocument();

    const loader = queryByTestId('loader');
    expect(loader).toBeInTheDocument();

    const appMain = queryByTestId('app-main');
    expect(appMain).toBeInTheDocument();
  });
});

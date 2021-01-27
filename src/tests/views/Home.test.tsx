import { render } from '@testing-library/react';
import Home from '../../views/Home';

describe('Home', () => {
  it('Elements render', () => {
    const { queryByTestId } = render(<Home />);
    const homeContainer = queryByTestId('home-container');
    expect(homeContainer).toBeInTheDocument();

    const singlePlayerBtn = queryByTestId('single-player-btn');
    expect(singlePlayerBtn).toBeInTheDocument();

    const multiPlayerBtn = queryByTestId('multi-player-btn');
    expect(multiPlayerBtn).toBeInTheDocument();
  });
});

import { fireEvent, render } from '@testing-library/react';
import Game from '../../components/Game';
import Home from '../../views/Home';
import { SINGLE_PLAYER } from '../../types/game';

describe('Game', () => {
  it('Button click', () => {
    const { queryByTestId } = render(<Game type={SINGLE_PLAYER} />);
    const playersContainer = queryByTestId('players-container');

    const homeComponent = render(<Home />);
    const btn = homeComponent.queryByTestId('single-player-btn');

    if (btn) fireEvent.click(btn);
    expect(playersContainer).toBeInTheDocument();
  });
});

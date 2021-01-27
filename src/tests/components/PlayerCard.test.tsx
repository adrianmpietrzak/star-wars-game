import React from 'react';
import { render } from '@testing-library/react';
import PlayerCard from '../../components/PlayerCard';

describe('PlayerCard Chips', () => {
  it('AI Chip', () => {
    const ai = {
      id: 2,
      score: 0,
      cpu: true,
    };
    const playerCard = render(<PlayerCard player={ai} />);
    const aiChip = playerCard.queryByTestId('ai-chip');
    expect(aiChip).toBeInTheDocument();
  });

  it('Player Chip', () => {
    const player = {
      id: 1,
      score: 0,
      cpu: false,
    };
    const playerCard = render(<PlayerCard player={player} />);
    const playerChip = playerCard.queryByTestId('player-chip');
    expect(playerChip).toBeInTheDocument();
  });
});

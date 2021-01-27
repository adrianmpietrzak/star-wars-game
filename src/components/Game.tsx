import React, { useContext, useEffect, useState } from 'react';
import { PeopleContext, StarshipsContext } from '../context';
import { getWinnerId, getWinnerMessage, randomItem } from '../helpers';
import { peopleDecidedKey, peopleKeysToPrint, starshipsDecidedKey, starshipsKeysToPrint } from '../types/card';
import { MULTI_PLAYER, PEOPLE, STARSHIPS, Player, PlayerRound } from '../types/game';
import FullCard from './FullCard';
import PlayerCard from './PlayerCard';

import Button from '@material-ui/core/Button';
import FlightIcon from '@material-ui/icons/Flight';
import PeopleIcon from '@material-ui/icons/People';

import '../styles/game.scss';

export interface GameProps {
  type: string;
}

const keys = {
  PEOPLE: {
    name: 'people',
    compare: 'mass',
  },
  STARSHIPS: {
    name: 'starships',
    compare: 'crew',
  },
};

const Game: React.FC<GameProps> = ({ type }) => {
  const { people } = useContext(PeopleContext);
  const { starships } = useContext(StarshipsContext);

  const [players, setPlayers] = useState<Player[]>([]);
  const [itemBank, setItemBank] = useState<string>();
  const [roundWinnerMessage, setRoundWinnerMessage] = useState<string>();
  const [roundItems, setRoundItems] = useState([]);
  const [roundItemsKeys, setRoundItemsKeys] = useState<string[]>([]);

  const rollRound = () => {
    if (itemBank) {
      const playersRound: PlayerRound[] = [];
      const round: any = [];

      for (let player of players) {
        const result = randomItem(itemBank === PEOPLE ? people : starships);
        playersRound.push({ ...player, item: result });
        round.push(result);
      }
      setRoundItemsKeys(itemBank === PEOPLE ? peopleKeysToPrint : starshipsKeysToPrint);
      setRoundItems(round);
      getWinner(playersRound, keys[itemBank].compare);
    }
  };

  const getWinner = (playersRound: PlayerRound[], key: string) => {
    const winner = getWinnerId(playersRound[0].item, playersRound[1].item, key);
    const winnerMessage = getWinnerMessage(playersRound[0].item, playersRound[1].item, key, type);
    setRoundWinnerMessage(winnerMessage);
    if (winner !== 0) changeScore(winner);
  };

  const changeScore = (playerId: number) => {
    const updatedPlayers = players.map((player) =>
      player.id === playerId
        ? {
            ...player,
            score: player.score + 1,
          }
        : player
    );

    setPlayers(updatedPlayers);
  };

  useEffect(() => {
    const playersArray: Player[] = [];

    for (let i = 1; i <= 2; i++) {
      playersArray.push({
        id: i,
        score: 0,
        cpu: type === MULTI_PLAYER ? false : i === 2 ? true : false,
      });
    }

    setPlayers(playersArray);
  }, [type]);

  return (
    <div>
      <div className='text-center'>
        <p>
          Select which type of resource do you want to use - people(
          <PeopleIcon />) or starships(
          <FlightIcon />)
        </p>
        <div className='container container--center mb10'>
          <div className='game-selector'>
            <input
              className='game-selector__input'
              type='radio'
              id='people'
              name='itemBank'
              value={PEOPLE}
              onChange={() => setItemBank(PEOPLE)}
            />
            <label className='game-selector__label' htmlFor='people'>
              <PeopleIcon />
            </label>
          </div>
          <div className='game-selector'>
            <input
              className='game-selector__input'
              type='radio'
              id='starships'
              name='itemBank'
              value={STARSHIPS}
              onChange={() => setItemBank(STARSHIPS)}
            />
            <label className='game-selector__label' htmlFor='starships'>
              <FlightIcon />
            </label>
          </div>
        </div>
        <Button
          data-testid='roll-btn'
          onClick={() => rollRound()}
          disabled={!itemBank}
          variant='contained'
          color='primary'
        >
          Roll
        </Button>
      </div>

      <div data-testid='players-container' className='container container--evenly p20'>
        {players.map((player) => (
          <PlayerCard key={`player-${player.id}`} player={player} />
        ))}
      </div>
      <div className='container container--evenly p20'>
        {roundItems.length > 0 &&
          roundItems.map((roundItem, index) => (
            <FullCard
              info={roundItem}
              keysToPrint={roundItemsKeys}
              boldKey={itemBank === PEOPLE ? peopleDecidedKey : starshipsDecidedKey}
              key={`round-${index}`}
            />
          ))}
      </div>
      <div className='text-center'>
        <h3>Round result:</h3>
        <p>{roundWinnerMessage}</p>
      </div>
    </div>
  );
};

export default Game;

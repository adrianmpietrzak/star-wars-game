import React, { useContext, useEffect, useState } from 'react';
import { PeopleContext, StarshipsContext } from '../context';
import { compareResults } from '../helpers';
import { peopleDecidedKey, peopleKeysToPrint, starshipsDecidedKey, starshipsKeysToPrint } from '../types/card';
import { MULTI_PLAYER, PEOPLE, STARSHIPS, Player, SINGLE_PLAYER, PlayerRound } from '../types/game';
import FullCard from './FullCard';
import PlayerCard from './PlayerCard';

import Button from '@material-ui/core/Button';
import FlightIcon from '@material-ui/icons/Flight';
import PeopleIcon from '@material-ui/icons/People';

import '../styles/game.scss';
import { PeopleModel, StarshipsModel } from '../types/api';

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

  const randomItem = (array: PeopleModel[] | StarshipsModel[]): PeopleModel | StarshipsModel => {
    return array[Math.floor(Math.random() * array.length)];
  };

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

  const filterResult = (result: string): number | number[] => {
    if (result.includes(',')) return parseFloat(result.replace(',', ''));
    if (result.includes('-')) return result.split('-').map((eachResult) => parseFloat(eachResult));
    return parseFloat(result);
  };

  const getWinnerMessage = (
    firstPlayerResult: PeopleModel | StarshipsModel,
    secondPlayerResult: PeopleModel | StarshipsModel,
    key: string
  ): string => {
    const firstResult = { id: 1, amount: filterResult(firstPlayerResult[key]) };
    const secondResult = {
      id: 2,
      amount: filterResult(secondPlayerResult[key]),
    };
    const res = compareResults(firstResult, secondResult);

    switch (res) {
      case -2:
        return "Can't tell, because parameters are in the same value range";
      case -1:
        return "Can't tell, because at least one of parameter is undefined";
      case 0:
        return 'Draw';
      case 1:
        if (type === SINGLE_PLAYER) return 'You win';
        return 'Player 1 win';
      case 2:
        if (type === SINGLE_PLAYER) return 'Computer win';
        return 'Player 2 win';
      default:
        return "Something wen't wrong";
    }
  };

  const getWinnerId = (
    firstPlayerResult: PeopleModel | StarshipsModel,
    secondPlayerResult: PeopleModel | StarshipsModel,
    key: string
  ): number => {
    if (parseFloat(firstPlayerResult[key]) > parseFloat(secondPlayerResult[key])) return 1;
    if (parseFloat(firstPlayerResult[key]) < parseFloat(secondPlayerResult[key])) return 2;
    return 0;
  };

  const getWinner = (playersRound: PlayerRound[], key: string) => {
    const winner = getWinnerId(playersRound[0].item, playersRound[1].item, key);
    const winnerMessage = getWinnerMessage(playersRound[0].item, playersRound[1].item, key);
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
        <Button onClick={() => rollRound()} disabled={!itemBank} variant='contained' color='primary'>
          Roll
        </Button>
      </div>

      <div className='container container--evenly p20'>
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

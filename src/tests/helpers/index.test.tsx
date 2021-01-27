import { compareResults, filterResult, getWinnerId, getWinnerMessage } from '../../helpers';
import {
  AI_WIN_MESSAGE,
  DRAW_MESSAGE,
  FIRST_PLAYER_WIN_MESSAGE,
  PLAYER_WIN_MESSAGE,
  SAME_RANGE_MESSAGE,
  SECOND_PLAYER_WIN_MESSAGE,
  SINGLE_PLAYER,
  UNDEFINED_MESSAGE,
} from '../../types/game';

const peopleObjectEntries = {
  birth_year: 'unknown',
  created: '2014-12-18T11:16:33.020000Z',
  edited: '2014-12-20T21:17:50.367000Z',
  eye_color: 'brown',
  films: ['http://swapi.dev/api/films/3/'],
  gender: 'male',
  hair_color: 'brown',
  height: 'unknown',
  homeworld: 'http://swapi.dev/api/planets/28/',
  name: 'Arvel Crynyd',
  skin_color: 'fair',
  species: [],
  starships: ['http://swapi.dev/api/starships/28/'],
  url: 'http://swapi.dev/api/people/29/',
  vehicles: [],
};

const firstPerson = { ...peopleObjectEntries, mass: '5' };
const secondPerson = { ...peopleObjectEntries, mass: '10' };
const thirdPerson = { ...peopleObjectEntries, mass: '1' };
const fourthPerson = { ...peopleObjectEntries, mass: 'unknown' };
const fifthPerson = { ...peopleObjectEntries, mass: '10-100' };

test('compareResults', () => {
  expect(compareResults({ id: 1, amount: 2 }, { id: 2, amount: 3 })).toBe(2);
  expect(compareResults({ id: 1, amount: 4 }, { id: 2, amount: 3 })).toBe(1);
  expect(compareResults({ id: 1, amount: NaN }, { id: 2, amount: 3 })).toBe(-1);
  expect(compareResults({ id: 1, amount: 2 }, { id: 2, amount: 2 })).toBe(0);
  expect(compareResults({ id: 1, amount: [2, 7] }, { id: 2, amount: 3 })).toBe(-2);
  expect(compareResults({ id: 1, amount: [10, 20] }, { id: 2, amount: [1, 10] })).toBe(-2);
});

test('filterResult', () => {
  expect(filterResult('10')).toBe(10);
  expect(filterResult('10-30')).toStrictEqual([10, 30]);
  expect(filterResult('123,456')).toBe(123456);
});

test('filterResult', () => {
  expect(getWinnerMessage(firstPerson, firstPerson, 'mass', SINGLE_PLAYER)).toBe(DRAW_MESSAGE);
  expect(getWinnerMessage(firstPerson, secondPerson, 'mass', SINGLE_PLAYER)).toBe(AI_WIN_MESSAGE);
  expect(getWinnerMessage(firstPerson, thirdPerson, 'mass', SINGLE_PLAYER)).toBe(PLAYER_WIN_MESSAGE);
  expect(getWinnerMessage(firstPerson, fourthPerson, 'mass', SINGLE_PLAYER)).toBe(UNDEFINED_MESSAGE);
  expect(getWinnerMessage(fifthPerson, fifthPerson, 'mass', SINGLE_PLAYER)).toBe(SAME_RANGE_MESSAGE);

  expect(getWinnerMessage(firstPerson, secondPerson, 'mass', 'MULTI_PLAYER')).toBe(SECOND_PLAYER_WIN_MESSAGE);
  expect(getWinnerMessage(firstPerson, thirdPerson, 'mass', 'MULTI_PLAYER')).toBe(FIRST_PLAYER_WIN_MESSAGE);
});

test('getWinnerId', () => {
  expect(getWinnerId(firstPerson, secondPerson, 'mass')).toBe(2);
  expect(getWinnerId(firstPerson, thirdPerson, 'mass')).toBe(1);
  expect(getWinnerId(firstPerson, firstPerson, 'mass')).toBe(0);
});

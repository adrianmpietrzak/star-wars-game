import {
  DRAW_MESSAGE,
  FIRST_PLAYER_WIN_MESSAGE,
  SECOND_PLAYER_WIN_MESSAGE,
  AI_WIN_MESSAGE,
  PLAYER_WIN_MESSAGE,
  ERROR_MESSAGE,
  UNDEFINED_MESSAGE,
  SAME_RANGE_MESSAGE,
  Entry,
} from './../types/game/index';
import { PeopleModel, StarshipsModel } from '../types/api';
import { SINGLE_PLAYER } from '../types/game';

export const compareResults = (firstEntry: Entry, secondEntry: Entry) => {
  if (!firstEntry.amount || !secondEntry.amount) return -1;
  if (!Array.isArray(firstEntry.amount) && !Array.isArray(secondEntry.amount)) {
    if (firstEntry.amount > secondEntry.amount) return firstEntry.id;
    if (secondEntry.amount > firstEntry.amount) return secondEntry.id;
    return 0;
  } else if (Array.isArray(firstEntry.amount) && Array.isArray(secondEntry.amount)) {
    if (firstEntry.amount[0] > secondEntry.amount[1]) return firstEntry.id;
    if (secondEntry.amount[0] > firstEntry.amount[1]) return secondEntry.id;
    return -2;
  } else if (Array.isArray(firstEntry.amount) && !Array.isArray(secondEntry.amount)) {
    if (firstEntry.amount[0] > secondEntry.amount) return firstEntry.id;
    if (secondEntry.amount > firstEntry.amount[1]) return secondEntry.id;
    return -2;
  } else if (!Array.isArray(firstEntry.amount) && Array.isArray(secondEntry.amount)) {
    if (secondEntry.amount[0] > firstEntry.amount) return secondEntry.id;
    if (firstEntry.amount > secondEntry.amount[1]) return firstEntry.id;
    return -2;
  }
};

export const filterResult = (result: string): number | number[] => {
  if (result.includes(',')) return parseFloat(result.replace(',', ''));
  if (result.includes('-')) return result.split('-').map((eachResult) => parseFloat(eachResult));
  return parseFloat(result);
};

export const randomItem = (array: PeopleModel[] | StarshipsModel[]): PeopleModel | StarshipsModel => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getWinnerMessage = (
  firstPlayerResult: PeopleModel | StarshipsModel,
  secondPlayerResult: PeopleModel | StarshipsModel,
  key: string,
  type: string
): string => {
  const firstResult = { id: 1, amount: filterResult(firstPlayerResult[key]) };
  const secondResult = {
    id: 2,
    amount: filterResult(secondPlayerResult[key]),
  };
  const res = compareResults(firstResult, secondResult);

  switch (res) {
    case -2:
      return SAME_RANGE_MESSAGE;
    case -1:
      return UNDEFINED_MESSAGE;
    case 0:
      return DRAW_MESSAGE;
    case 1:
      if (type === SINGLE_PLAYER) return PLAYER_WIN_MESSAGE;
      return FIRST_PLAYER_WIN_MESSAGE;
    case 2:
      if (type === SINGLE_PLAYER) return AI_WIN_MESSAGE;
      return SECOND_PLAYER_WIN_MESSAGE;
    default:
      return ERROR_MESSAGE;
  }
};

export const getWinnerId = (
  firstPlayerResult: PeopleModel | StarshipsModel,
  secondPlayerResult: PeopleModel | StarshipsModel,
  key: string
): number => {
  if (parseFloat(firstPlayerResult[key]) > parseFloat(secondPlayerResult[key])) return 1;
  if (parseFloat(firstPlayerResult[key]) < parseFloat(secondPlayerResult[key])) return 2;
  return 0;
};

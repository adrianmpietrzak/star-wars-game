import { PeopleModel, StarshipsModel } from '../api';

// Game types
export const SINGLE_PLAYER = 'SINGLE_PLAYER';
export const MULTI_PLAYER = 'MULTI_PLAYER';

// Game resources types
export const PEOPLE = 'PEOPLE';
export const STARSHIPS = 'STARSHIPS';

// Round messages
export const DRAW_MESSAGE = 'Draw';
export const PLAYER_WIN_MESSAGE = 'You win';
export const AI_WIN_MESSAGE = 'Computer win';
export const FIRST_PLAYER_WIN_MESSAGE = 'Player 1 win';
export const SECOND_PLAYER_WIN_MESSAGE = 'Player 2 win';
export const UNDEFINED_MESSAGE = "Can't tell, because at least one of parameter is undefined";
export const SAME_RANGE_MESSAGE = "Can't tell, because parameters are in the same value range";
export const ERROR_MESSAGE = "Something wen't wrong";

// Interfaces
export interface Player {
  id: number;
  score: number;
  cpu: boolean;
}

export interface PlayerRound {
  id: number;
  item: PeopleModel | StarshipsModel;
}

export interface Entry {
  id: number;
  amount: number | number[];
}

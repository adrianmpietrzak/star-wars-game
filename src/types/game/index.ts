import { PeopleModel, StarshipsModel } from '../api';

export const SINGLE_PLAYER = 'SINGLE_PLAYER';
export const MULTI_PLAYER = 'MULTI_PLAYER';
export const PEOPLE = 'PEOPLE';
export const STARSHIPS = 'STARSHIPS';

export interface Player {
  id: number,
  score: number,
  cpu: boolean
}

export interface PlayerRound {
  id: number,
  item: PeopleModel | StarshipsModel,
}
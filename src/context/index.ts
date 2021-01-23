import { createContext } from 'react';
import { PeopleContextModel, StarshipsContextModel } from '../types/context';

export const PeopleContext = createContext<PeopleContextModel>({
  people: [],
  setPeople: () => { }
});

export const StarshipsContext = createContext<StarshipsContextModel>({
  starships: [],
  setStarships: () => { }
});

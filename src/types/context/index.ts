import { PeopleModel, StarshipsModel } from '../api';

export interface PeopleContextModel {
  people: PeopleModel[],
  setPeople: Function
}

export interface StarshipsContextModel {
  starships: StarshipsModel[],
  setStarships: Function
}

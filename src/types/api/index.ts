export interface ApiResult<T> {
  count: number
  next: string
  previous: null | string,
  results: Array<T>
}

export interface PeopleModel {
  starships: string[],
  edited: string,
  name: string,
  created: string,
  url: string,
  gender: string,
  vehicles: string[],
  skin_color: string,
  hair_color: string,
  height: string,
  eye_color: string,
  mass: string,
  films: string[],
  species: string[],
  homeworld: string,
  birth_year: string
}

export interface StarshipsModel {
  passengers: string,
  pilots: string[],
  name: string,
  hyperdrive_rating: string,
  url: string,
  cargo_capacity: string,
  edited: string,
  consumables: string,
  max_atmosphering_speed: string,
  crew: string,
  length: string,
  MGLT: string,
  starship_class: string,
  created: string,
  films: string[],
  model: string,
  cost_in_credits: string,
  manufacturer: string
}
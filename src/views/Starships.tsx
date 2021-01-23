import React, { useContext } from 'react';
import { StarshipsContext } from '../context';

export interface StarshippsProps {

}

const Starshipps: React.FC<StarshippsProps> = () => {
  const { starships, setStarships } = useContext(StarshipsContext);

  const setStarshipsData = () => {
    setStarships([{
      passengers: 'string',
      pilots: ['Array<string>'],
      name: 'string',
      hyperdrive_rating: 'string',
      url: 'string',
      cargo_capacity: 'string',
      edited: 'string',
      consumables: 'string',
      max_atmosphering_speed: 'string',
      crew: 'string',
      length: 'string',
      MGLT: 'string',
      starship_class: 'string',
      created: 'string',
      films: ['Array<string>'],
      model: 'string',
      cost_in_credits: 'string',
      manufacturer: 'string'
    }]);
  }

  return (
    <div>
      <h1>TEST</h1>
      <p>starships = {JSON.stringify(starships)}</p>
      <button onClick={setStarshipsData}>Click</button>
    </div>
  );
}

export default Starshipps;
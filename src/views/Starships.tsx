import React, { useContext } from 'react';
import FullCard from '../components/FullCard';
import { StarshipsContext } from '../context';
import { starshipsDecidedKey, starshipsKeysToPrint } from '../types/card';

const Starships: React.FC = () => {
  const { starships } = useContext(StarshipsContext);

  return (
    <div>
      <h2>Available Starships</h2>
      <div className='container'>
        {starships.map((starship) => (
          <FullCard
            info={starship}
            keysToPrint={starshipsKeysToPrint}
            key={starship.name}
            boldKey={starshipsDecidedKey}
          />
        ))}
      </div>
    </div>
  );
};

export default Starships;

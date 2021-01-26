import React, { useContext } from 'react';
import FullCard from '../components/FullCard';
import { PeopleContext } from '../context';
import { peopleDecidedKey, peopleKeysToPrint } from '../types/card';

const People: React.FC = () => {
  const { people } = useContext(PeopleContext);

  return (
    <div>
      <h2>People</h2>
      <div className='container'>
        {people.map((person) => (
          <FullCard info={person} keysToPrint={peopleKeysToPrint} key={person.name} boldKey={peopleDecidedKey} />
        ))}
      </div>
    </div>
  );
};

export default People;

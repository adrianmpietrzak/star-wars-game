import React, { useContext, useEffect, useRef, useState } from 'react';
import { ClientApi } from '../api';
import PersonCard from '../components/PeopleCard';
import { PeopleContext } from '../context';
import { PeopleModel } from '../types/api';

export interface PeopleProps {

}

let request = new ClientApi();

const getResults = async (url?: string) => {
  return await request.getPeople(url);
}

const People: React.FC<PeopleProps> = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const [loading, setLoading] = useState<Boolean>(false);
  const isMounted = useRef(true);


  useEffect(() => {
    const tempPeopleArray: PeopleModel[] = [];

    const fetchData = async (url?: string) => {
      setLoading(true);
      const { next, results } = await getResults(url);

      tempPeopleArray.push(...results);

      if (isMounted.current) {
        if (next) {
          await fetchData(next);
        } else {
          setPeople(tempPeopleArray);
          setLoading(false);
        }
      }
    }

    if (!people.length) {
      fetchData();
    } else {
      console.log('ENTRY', people)
    }
    return () => { isMounted.current = false; };
  }, [people, setPeople]);

  return (
    <div>
      {loading
        ? (<div>loading</div>)
        : people.map(person => <PersonCard info={person} key={person.name} />)
        // : (<div>people = {JSON.stringify(people)}</div>)
      }
    </div>

  );
}

export default People;

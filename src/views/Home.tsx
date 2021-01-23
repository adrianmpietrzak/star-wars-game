import { useContext } from 'react';
import { PeopleContext } from '../context';

export interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
  const { people } = useContext(PeopleContext);

  return (
    <div>Home = {JSON.stringify(people)}</div>
  );
}

export default Home;
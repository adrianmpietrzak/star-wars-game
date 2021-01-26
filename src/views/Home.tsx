import { useState } from 'react';
import Game from '../components/Game';
import { MULTI_PLAYER, SINGLE_PLAYER } from '../types/game';

import Button from '@material-ui/core/Button';

const Home: React.FC = () => {
  const [selectedGameVariant, setSelecteGameVariant] = useState<string | null>(null);

  return (
    <div>
      {selectedGameVariant ? (
        <Game type={selectedGameVariant} />
      ) : (
        <div className='text-center'>
          <p>Hello on Star Wars battle game.</p>
          <p>You can choose one of two options to play</p>

          <p>Would you like to play vs AI or vs other player</p>
          <Button
            style={{ margin: 5 }}
            onClick={() => setSelecteGameVariant(SINGLE_PLAYER)}
            variant='contained'
            color='secondary'
          >
            Single Player
          </Button>
          <Button
            style={{ margin: 5 }}
            onClick={() => setSelecteGameVariant(MULTI_PLAYER)}
            variant='contained'
            color='primary'
          >
            Multi Player
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;

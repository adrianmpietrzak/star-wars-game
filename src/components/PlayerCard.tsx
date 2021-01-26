import Chip from '@material-ui/core/Chip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ComputerIcon from '@material-ui/icons/Computer';
import { Player } from '../types/game';

export interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { id, score, cpu } = player;

  return (
    <div className='text-center'>
      {cpu ? (
        <Chip icon={<ComputerIcon />} label='AI' color='secondary' />
      ) : (
        <Chip icon={<AccountCircleIcon />} label={`Player ${id}`} color='primary' />
      )}
      <div>
        Score: <strong className='text--green'>{score}</strong>
      </div>
    </div>
  );
};

export default PlayerCard;

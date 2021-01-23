import { PeopleModel } from '../types/api';

export interface PersonCardProps {
  info: PeopleModel
}

const PersonCard: React.FC<PersonCardProps> = (props) => {
  return (
    <div>
      <h3>{props.info.name}</h3>
      <p>{props.info.mass}</p>
    </div>
  );
}

export default PersonCard;
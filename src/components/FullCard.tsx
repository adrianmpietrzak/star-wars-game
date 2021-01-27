import React from 'react';
import { PeopleModel, StarshipsModel } from '../types/api';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export interface FullCardProps {
  info: PeopleModel | StarshipsModel;
  keysToPrint: string[];
  boldKey: string;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    flex: 1,
    margin: 5,
  },
  bold: {
    color: '#f50057',
    fontWeight: 'bold',
  },
  key: {
    minWidth: 100,
    textTransform: 'capitalize',
  },
  textRight: {
    textAlign: 'right',
  },
  title: {
    marginBottom: 5,
  },
  pos: {
    display: 'flex',
    fontSize: 12,
    justifyContent: 'space-between',
  },
});

const FullCard: React.FC<FullCardProps> = ({ info, keysToPrint, boldKey }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h5' component='h2' className={classes.title}>
          {info.name}
        </Typography>
        {keysToPrint.map((key) => (
          <Typography
            className={clsx(classes.pos, {
              [classes.bold]: key === boldKey,
            })}
            color='textSecondary'
            key={key}
          >
            <strong data-testid={`label-${key}`} className={classes.key}>
              {key.replace(/_/g, ' ')}
            </strong>
            <span data-testid={`value-${key}`} className={classes.textRight}>
              {info[key]}
            </span>
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default FullCard;

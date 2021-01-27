import React, { useEffect, useMemo, useState } from 'react';
import People from './views/People';
import Starships from './views/Starships';
import Home from './views/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { StarshipsContext, PeopleContext } from './context';
import { PeopleModel, StarshipsModel } from './types/api';
import { ClientApi } from './api';

import clsx from 'clsx';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FlightIcon from '@material-ui/icons/Flight';
import PeopleIcon from '@material-ui/icons/People';

import './styles/global.scss';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  link: {
    textDecoration: 'none',
    color: '#000000DE',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  toolbarClose: {
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function App() {
  const [peopleLoading, setPeopleLoading] = useState<Boolean>(true);
  const [starshipsLoading, setStarshipsLoading] = useState<Boolean>(true);

  const [people, setPeople] = useState<Array<PeopleModel>>([]);
  const [starships, setStarships] = useState<Array<StarshipsModel>>([]);

  const peopleMemo = useMemo(() => ({ people, setPeople }), [people, setPeople]);
  const starshipsMemo = useMemo(() => ({ starships, setStarships }), [starships, setStarships]);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    let request = new ClientApi();

    const tempPeopleArray: PeopleModel[] = [];
    const tempStarshipsArray: StarshipsModel[] = [];

    const getPeopleResults = async (url?: string) => {
      const response = await request.getPeople(url);
      tempPeopleArray.push(...response.results);

      if (response.next) {
        getPeopleResults(response.next);
      } else {
        setPeople(tempPeopleArray);
        setPeopleLoading(false);
      }
    };

    const getStarshipsResults = async (url?: string) => {
      const response = await request.getStarships(url);
      tempStarshipsArray.push(...response.results);

      if (response.next) {
        getStarshipsResults(response.next);
      } else {
        setStarships(tempStarshipsArray);
        setStarshipsLoading(false);
      }
    };

    const getResults = async () => {
      try {
        await getPeopleResults();
        await getStarshipsResults();
      } catch {
        console.error('Something went wrong');
      }
    };

    getResults();
  }, []);

  return (
    <Router>
      <div data-testid='app-container' className={classes.root}>
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div
            className={clsx(classes.toolbar, {
              [classes.toolbarClose]: !open,
            })}
          >
            {open ? (
              <IconButton onClick={() => setOpen(false)}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            ) : (
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={() => setOpen(true)}
                className={clsx(classes.menuButton)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </div>

          <Divider />

          <List>
            <Link to='/' className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <SportsEsportsIcon />
                </ListItemIcon>
                <ListItemText primary={'Play'} />
              </ListItem>
            </Link>
            <Link to='/people' className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={'People'} />
              </ListItem>
            </Link>
            <Link to='/starships' className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <FlightIcon />
                </ListItemIcon>
                <ListItemText primary={'Starships'} />
              </ListItem>
            </Link>
          </List>
          <Divider />
        </Drawer>

        <main className={classes.content} data-testid='app-main'>
          {peopleLoading || starshipsLoading ? (
            <div className='loader-wrapper'>
              <div data-testid='loader' className='loader'></div>
            </div>
          ) : (
            <PeopleContext.Provider value={peopleMemo}>
              <StarshipsContext.Provider value={starshipsMemo}>
                <Switch>
                  <Route path='/people'>
                    <People />
                  </Route>
                  <Route path='/starships'>
                    <Starships />
                  </Route>
                  <Route path='/'>
                    <Home />
                  </Route>
                </Switch>
              </StarshipsContext.Provider>
            </PeopleContext.Provider>
          )}
        </main>
      </div>
    </Router>
  );
}

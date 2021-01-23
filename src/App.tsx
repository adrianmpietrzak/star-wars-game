import React, { useMemo, useState } from 'react';
import './App.css';
import People from './views/People';
import Starships from './views/Starships';
import Home from './views/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { StarshipsContext, PeopleContext } from './context';
import { PeopleModel, StarshipsModel } from './types/api';

function App() {
  const [people, setPeople] = useState<Array<PeopleModel>>([]);
  const [starships, setStarships] = useState<Array<StarshipsModel>>([]);

  const peopleMemo = useMemo(() => ({ people, setPeople }), [people, setPeople]);
  const starshipsMemo = useMemo(() => ({ starships, setStarships }), [starships, setStarships]);

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/people">People</Link>
            </li>
            <li>
              <Link to="/starships">Starships</Link>
            </li>
          </ul>
        </nav>
      </div>
      <PeopleContext.Provider value={peopleMemo}>
        <StarshipsContext.Provider value={starshipsMemo}>
          <Switch>
            <Route path="/people">
              <People />
            </Route>
            <Route path="/starships">
              <Starships />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </StarshipsContext.Provider>
      </PeopleContext.Provider>
    </Router>
  );
}

export default App;

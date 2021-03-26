import { BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import AllRacers from './components/AllRacers';
import RaceDetails from "./components/RaceDetails";

const App = () => {

  const [races, setRaces]=useState([]);
  const [winner, setWinner]=useState('');

  useEffect(() => {
    fetch('https://ergast.com/api/f1/2020/results/1.json')
    .then(response=>response.json())
    .then(data => setRaces(data.MRData.RaceTable.Races))
    .catch(error=>console.error(error));

    fetch('https://ergast.com/api/f1/2020/driverStandings.json')
    .then(response => response.json())
    .then(data => {
      const raceWinnerFirstName=data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName;
      const raceWinnerLastName=data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.familyName;
      setWinner(`${raceWinnerFirstName} ${raceWinnerLastName}`);
    })
    .catch(error=>console.error(error))

  }, [])

  return (
    <div className="App">
     <h1>F1 Racers of 2020</h1>
    <Router>
      <Switch>
        <Route exact path="/">
          <AllRacers races={races} winner={winner}/>
        </Route>
        <Route path="/RaceDetails">
          <RaceDetails/>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;

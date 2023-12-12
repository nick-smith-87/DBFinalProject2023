// App.js
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container
} from '@mui/material';
import axios from "axios";
import AllTeams from './components/AllTeams';
import AllPlayers from './components/AllPlayers';

const baseURL =  "http://localhost:3001/api"


function App() {
  const [showType, setShowType] = useState('');
  const [returnData, setReturnData] = useState(null);

  const getAllTeams = () => {
    axios.get(`${baseURL}/fetch_all_teams`)
      .then(response => {
        console.log(response.data)
        setReturnData(response.data)
        setShowType('all_teams')
      })
      .catch(error => {
        console.error('There was an error!', error)
      })
  };

  const getAllPlayers = () => {
    axios.get(`${baseURL}/fetch_all_players`)
      .then(response => {
        console.log(response.data)
        setReturnData(response.data)
        setShowType('all_players')
      })
      .catch(error => {
        console.error('There was an error!', error)
      })
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Fantasy Football Builder</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <div style={{ marginTop: '20px' }}>
          <Button variant="contained" onClick={() => getAllTeams()}>
            View All Teams
          </Button>
          <Button variant="contained" onClick={() => getAllPlayers()}>
            View All Players
          </Button>
        </div>
        <div style={{ marginTop: '20px' }}>
          {showType && showType === 'all_teams' && ( 
            <AllTeams data={returnData} />
          )}
          {showType && showType === 'all_players' && ( 
            <AllPlayers data={returnData} />
          )}
        </div>
      </Container>
    </div>
  );
}


export default App;

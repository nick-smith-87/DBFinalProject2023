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
import Allteams from './components/Allteams';

const baseURL =  "http://localhost:3001/api"


function App() {
  const [loading, setLoading] = useState(false);
  const [returnData, setReturnData] = useState(null);

  const getAll = () => {
    axios.get(`${baseURL}/fetch_all`)
      .then(response => {
        console.log(response.data)
        setReturnData(response.data)
        setLoading(!loading)
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
          <Button variant="contained" onClick={() => getAll()}>
            View All Teams
          </Button>
        </div>
        <div style={{ marginTop: '20px' }}>
          {loading && ( 
            <Allteams data={returnData} />
          )}
        </div>
      </Container>
    </div>
  );
}


export default App;

// App.js
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';import axios from "axios";

const baseURL =  "http://localhost:3001/api"


function App() {
  const [loading, setLoading] = useState(false);
  const [returnData, setReturnData] = useState(null);

  const handleButtonClick = (content) => {
    setLoading(content);
  };

  /*const getAll = () => {
    const {data} = await axios.get('http://localhost:3001/api/fetch_all')
    fetch('http://localhost:3001/api/fetch_all')
      .then(response => response.json())
      .then(data => setReturnData(data.message))
      .then(setDisplayContent = true)
      .catch(error => console.error('Error fetching data: ', error));
  };*/

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
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Team ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>Wins</TableCell>
                    <TableCell>Losses</TableCell>
                    <TableCell>Made Playoffs</TableCell>
                    <TableCell>Salary of Players Used</TableCell>
                    <TableCell>Conference</TableCell>
                    <TableCell>Division</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {returnData.map((team, index) => (
                    <TableRow key={index}>
                      <TableCell>{team.teamid}</TableCell>
                      <TableCell>{team.name}</TableCell>
                      <TableCell>{team.state}</TableCell>
                      <TableCell>{team.win}</TableCell>
                      <TableCell>{team.loss}</TableCell>
                      <TableCell>{team.madeplayoffs}</TableCell>
                      <TableCell>{team.salary_of_players_used}</TableCell>
                      <TableCell>{team.conference}</TableCell>
                      <TableCell>{team.division}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </Container>
    </div>
  );
}


export default App;

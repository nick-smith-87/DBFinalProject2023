// App.js
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';


function AllTeams(props) {

  const {data} = props;

  return (
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
          {data.map((team, index) => (
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
  );
}


export default AllTeams;

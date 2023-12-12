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

function AllPlayers(props) {
  const { data } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Player ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Fantasy Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((player, index) => (
            <TableRow key={index}>
              <TableCell>{player.playerid}</TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.position}</TableCell>
              <TableCell>{'$' + player.salary.toLocaleString()}</TableCell>
              <TableCell>{player.fantasypoints}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AllPlayers;

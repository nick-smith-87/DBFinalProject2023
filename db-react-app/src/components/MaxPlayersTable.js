import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableBody,
} from "@mui/material";

function MaxPlayersTable(props) {
  const { maxScorePlayers, maxPoints, maxPointsSalary } = props;

  return (
    <TableContainer component={Paper} sx={{ my: 2 }}>
      <Table size="small">
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
          {maxScorePlayers.map((player) => (
            <TableRow key={player.playerid}>
              <TableCell>{player.playerid}</TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.position}</TableCell>
              <TableCell>${player.salary.toLocaleString()}</TableCell>
              <TableCell>{player.fantasypoints}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableRow>
          <TableCell colSpan={3}><b>Total</b></TableCell>
          <TableCell><b>${maxPointsSalary.toLocaleString()}</b></TableCell>
          <TableCell><b>{maxPoints}</b></TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
}

export default MaxPlayersTable;

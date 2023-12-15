import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button
} from "@mui/material";
//import axios from "axios";

//const baseURL = "http://localhost:3001/api";

function BuildYourTeam(props) {
  const { players } = props;
  const [playersData, setPlayersData] = useState(players);
  const [selectedPlayers, setSelectedPlayers] = useState({
    QB: "", QBpoints: 0,
    RB: "", RBpoints: 0,
    WR: "", WRpoints: 0,
    TE: "", TEpoints: 0,
  });
  console.log(selectedPlayers);
  const [salaryCap, setSalaryCap] = useState("");
  const [maxPoints, setMaxPoints] = useState(0);

  const fullReset = () => {
    setSelectedPlayers({
      QB: "", QBpoints: 0,
      RB: "", RBpoints: 0,
      WR: "", WRpoints: 0,
      TE: "", TEpoints: 0,
    });
    setSalaryCap("");
    setMaxPoints(0); 
    setPlayersData(players);
  };

  const partialReset = () => {
    setSelectedPlayers(prevState => ({
      ...prevState,
      QB: "", QBpoints: 0,
      RB: "", RBpoints: 0,
      WR: "", WRpoints: 0,
      TE: "", TEpoints: 0,
    }));
    // Keep salaryCap and maxPoints unchanged
  };

  const handlePlayerChange = (position, event) => {
    const playerId = event.target.value;
    const player = playersData.find((p) => p.playerid === playerId);
    const points = player ? parseFloat(player.fantasypoints) : 0;

    setSelectedPlayers((prev) => {
      const updatedSelectedPlayers = {
        ...prev,
        [position]: playerId,
        [`${position}points`]: points,
      };

      // Check if all positions are selected
      if (updatedSelectedPlayers.QB && updatedSelectedPlayers.RB && updatedSelectedPlayers.WR && updatedSelectedPlayers.TE) {
        const totalFantasyPoints = calculateTotalFantasyPoints();
        if (totalFantasyPoints > maxPoints) {
          setMaxPoints(totalFantasyPoints);
        }
      }

      return updatedSelectedPlayers;
    });
  };

  const handleSalaryCapChange = (event) => {
    setSalaryCap(event.target.value);
  };

  const calculateTotalSalary = () => {
    return Object.values(selectedPlayers).reduce((total, playerId) => {
      const player = playersData.find((p) => p.playerid === playerId);
      return total + (player ? player.salary : 0);
    }, 0);
  };

  const calculateSalaryLeft = () => {
    return salaryCap - calculateTotalSalary();
  };

  const calculateRemainingCap = () => {
    if (salaryCap === "Unlimited") {
      return "Unlimited";
    }
    const totalSalary = calculateTotalSalary();
    return salaryCap - totalSalary;
  };

  const calculateTotalFantasyPoints = () => {
    const totalPoints = ['QB', 'RB', 'WR', 'TE'].reduce((total, position) => {
      return total + selectedPlayers[`${position}points`];
    }, 0);
  
    return parseFloat(totalPoints.toFixed(10));
  };

  const renderPositionSelect = (position) => {
    const remainingCap = calculateRemainingCap();
    const selectedPlayerId = selectedPlayers[position];
    console.log(`Current selected player for ${position}:`, selectedPlayerId);
    const filteredPlayers = playersData.filter(
      (p) =>
        p.position === position &&
        (p.playerid === selectedPlayerId ||
          remainingCap === "Unlimited" ||
          p.salary <= remainingCap)
    );
    console.log(selectedPlayers[position]);
    return (
      <FormControl key={position} style={{ width: "200px", margin: "10px" }}>
        <InputLabel>{position}</InputLabel>
        {selectedPlayers[position] || !salaryCap ? (
          <Select
            disabled
            value={selectedPlayers[position]}
            onChange={(e) => handlePlayerChange(position, e)}
          >
            {filteredPlayers.map((player) => (
              <MenuItem key={player.playerid} value={player.playerid}>
                {player.name} - ${player.salary.toLocaleString()}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Select
            value={selectedPlayers[position]}
            onChange={(e) => handlePlayerChange(position, e)}
          >
            {filteredPlayers.map((player) => (
              <MenuItem key={player.playerid} value={player.playerid}>
                {player.name} - ${player.salary.toLocaleString()}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    );
  };

  return (
    <div>
      <FormControl style={{ width: "200px", margin: "10px" }}>
        <InputLabel>Salary Cap</InputLabel>
        <Select
          value={salaryCap}
          onChange={handleSalaryCapChange}
          disabled={salaryCap !== ""}
        >
          <MenuItem key={0} value="Unlimited">
            Unlimited
          </MenuItem>
          <MenuItem key={1} value={5000000}>
            $5,000,000
          </MenuItem>
          <MenuItem key={2} value={10000000}>
            $10,000,000
          </MenuItem>
          <MenuItem key={3} value={15000000}>
            $15,000,000
          </MenuItem>
          <MenuItem key={4} value={20000000}>
            $20,000,000
          </MenuItem>
          <MenuItem key={5} value={25000000}>
            $25,000,000
          </MenuItem>
          <MenuItem key={6} value={30000000}>
            $30,000,000
          </MenuItem>
          <MenuItem key={7} value={35000000}>
            $35,000,000
          </MenuItem>
          <MenuItem key={8} value={20000000}>
            $40,000,000
          </MenuItem>
        </Select>
      </FormControl>
      <br></br>

      {["QB", "RB", "WR", "TE"].map(renderPositionSelect)}

      <Typography variant="h6" style={{ marginTop: "20px", marginLeft: "20px" }}>
        Total Team Salary: ${calculateTotalSalary().toLocaleString()}
      </Typography>
      {salaryCap !== "Unlimited" ? (
        <Typography variant="h6" style={{ marginTop: "20px", marginLeft: "20px" }}>
          Remaining Money: ${calculateSalaryLeft().toLocaleString()}
        </Typography>
      ) : (
        <Typography variant="h6" style={{ marginTop: "20px", marginLeft: "20px" }}>
          Remaining Money: $∞
        </Typography>
      )}
      <Typography variant="h6" style={{ marginTop: "20px", marginLeft: "20px" }}>
        Total Fantasy Points: {calculateTotalFantasyPoints()}
      </Typography>
      <Typography variant="h6" style={{ marginTop: "20px", marginLeft: "20px", marginBottom: "20px" }}>
        Max Points: {maxPoints}
      </Typography>
      <Button variant="contained" color="warning" onClick={partialReset} style={{ margin: '10px' }}>
        Reset Positions
      </Button>
      <Button variant="contained" color="error" onClick={fullReset} style={{ margin: '10px' }}>
        Full Restart
      </Button>
    </div>
  );
}

export default BuildYourTeam;

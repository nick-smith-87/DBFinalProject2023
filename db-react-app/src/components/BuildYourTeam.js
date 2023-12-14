import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import axios from 'axios';

const baseURL = "http://localhost:3001/api";

function BuildYourTeam(props) {
  const [playersData, setPlayersData] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState({ QB: '', RB: '', WR: '', TE: '' });
  const [salaryCap, setSalaryCap] = useState('Unlimited');
  
  useEffect(() => {
    const fetchPlayers = () => {
      axios.get(`${baseURL}/get_players_to_build_your_team`, { params: { cap: salaryCap } })
        .then(response => {
          console.log("Fetched players:", response.data);
          setPlayersData(response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    };
    fetchPlayers();

  }, [salaryCap]);

  const handlePlayerChange = (position, event) => {
    setSelectedPlayers(prev => ({ ...prev, [position]: event.target.value }));
  };

  const handleSalaryCapChange = (event) => {
    setSalaryCap(event.target.value);
  };

  const calculateTotalSalary = () => {
    return Object.values(selectedPlayers).reduce((total, playerId) => {
      const player = playersData.find(p => p.id === playerId);
      return total + (player ? player.salary : 0);
    }, 0);
  };

  const calculateRemainingCap = () => {
    if (salaryCap === 'Unlimited') {
      return 'Unlimited';
    }
    const totalSalary = calculateTotalSalary();
    return salaryCap - totalSalary;
  };

  const renderPositionSelect = (position) => {
    const remainingCap = calculateRemainingCap();
    const filteredPlayers = playersData.filter(p => 
      p.position === position && 
      (remainingCap === 'Unlimited' || p.salary <= remainingCap)
    );
    return (
      <FormControl key={position} style={{ width: '200px', margin: '10px' }}>
        <InputLabel>{position}</InputLabel>
        <Select
          value={selectedPlayers[position]}
          onChange={(e) => handlePlayerChange(position, e)}
        >
          {filteredPlayers.map(player => (
            <MenuItem key={player.id} value={player.id}>
              {player.name} - ${player.salary.toLocaleString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <div>

      <FormControl style={{ width: '200px', margin: '10px' }}>
        <InputLabel>Salary Cap</InputLabel>
        <Select value={salaryCap} onChange={handleSalaryCapChange}>
          <MenuItem value="Unlimited">Unlimited</MenuItem>
          <MenuItem value={50000000}>$50,000,000</MenuItem>
          <MenuItem value={100000000}>$100,000,000</MenuItem>
          <MenuItem value={150000000}>$150,000,000</MenuItem>
          <MenuItem value={200000000}>$200,000,000</MenuItem>
        </Select>
      </FormControl>
      <br></br>

      {['QB', 'RB', 'WR', 'TE'].map(renderPositionSelect)}

      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Total Team Salary: ${calculateTotalSalary().toLocaleString()}
      </Typography>
    </div>
  );
}

export default BuildYourTeam;

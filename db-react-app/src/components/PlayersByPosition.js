import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AllPlayers from './AllPlayers';
import axios from 'axios';
const baseURL = "http://localhost:3001/api"


function PlayersByTeam() {
  const [selectedPosition, setSelectedPosition] = useState('');
  const [loading, setLoading] = useState(false);
  const [returnData, setReturnData] = useState(null);

  const handlePositionChange = (event) => {
    const selectedPosition = event.target.value;

    setSelectedPosition(selectedPosition);
    setLoading(false);

    axios.get(`${baseURL}/get_players_by_position`, {
      params: { position: selectedPosition }, 
    })
      .then(response => {
        console.log(response.data)
        setReturnData(response.data)
        setLoading(true);

      })
      .catch(error => {
        console.error('There was an error!', error)
      })

  };


  return (
    <div>
      <FormControl>
        <InputLabel id="team-dropdown-label">Select Position</InputLabel>
        <Select
          labelId="team-dropdown-label"
          id="team-dropdown"
          value={selectedPosition}
          label="Select a Position"
          onChange={handlePositionChange}
          style={{ width: '200px' }}
        >
          <MenuItem value="QB">QB</MenuItem>
          <MenuItem value="RB">RB</MenuItem>
          <MenuItem value="WR">WR</MenuItem>
          <MenuItem value="TE">TE</MenuItem>
        </Select>
    </FormControl>
      {
    loading && (
      <AllPlayers data={returnData} />
    )
  }
    </div >
  );
}

export default PlayersByTeam;

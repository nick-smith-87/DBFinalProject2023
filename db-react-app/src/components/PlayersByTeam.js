import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AllPlayers from './AllPlayers';
import axios from 'axios';
const baseURL =  "http://localhost:3001/api"


function PlayersByTeam(props) {
  const { data } = props;
  const [selectedTeam, setSelectedTeam] = useState('');
  const [loading, setLoading] = useState(false);  
  const [returnData, setReturnData] = useState(null);

  const handleTeamChange = (event) => {
    const selectedTeam = event.target.value;
  
    setSelectedTeam(selectedTeam);
    setLoading(false);
  
    axios.get(`${baseURL}/get_players_by_team`, {
      params: { teamName: selectedTeam }, // Pass the selected team to the server
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
        <InputLabel id="team-dropdown-label">Select Team</InputLabel>
        <Select
          labelId="team-dropdown-label"
          id="team-dropdown"
          value={selectedTeam}
          label="Select a Team"
          onChange={handleTeamChange}
          style={{ width: '200px' }} 
        >
          {data.map((team) => (
            <MenuItem key={team.id} value={team.name}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {loading  && ( 
            <AllPlayers data={returnData} />
          )}
    </div>
  );
}

export default PlayersByTeam;

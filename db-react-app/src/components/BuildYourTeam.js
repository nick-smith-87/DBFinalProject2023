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


function BuildYourTeam(props) {
  const { data } = props;

  const [selectedTeam, setSelectedTeam] = useState('');
  const [loading, setLoading] = useState(false);  
  const [returnData, setReturnData] = useState(null);
  const [selectedQB, setSelectedQB] = useState('');
  const [selectedRB, setSelectedRB] = useState('');
  const [selectedWR, setSelectedWR] = useState('');
  const [selectedTE, setSelectedTE] = useState('');



  const handleTeamChange = (event) => {
    const selectedTeam = event.target.value;
  
    setSelectedTeam(selectedTeam);
    setLoading(false);
    /*
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
    */

  };
  

  return (
    <div>
      <FormControl>
        <InputLabel id="team-dropdown-label">Select A Team</InputLabel>
        <Select
          labelId="team-dropdown-label"
          id="team-dropdown"
          value={selectedTeam}
          label="Select a Team"
          onChange={handleTeamChange}
          style={{ width: '400px' }} 
        >
          {data.map((team) => (
            <MenuItem key={team.id} value={team.name}>
              {team.name} - ${team.salary_of_players_used.toLocaleString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {loading  && ( 
          //add select forms for QB, RB, WR, TE
            <AllPlayers data={returnData} />
          )}
    </div>
  );
}

export default BuildYourTeam;

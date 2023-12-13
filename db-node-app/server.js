// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

// for nick
const pool = new Pool({
  user: 'nicksmith', // replace with your postgres username
  host: 'localhost',
  database: 'nicksmith', // replace with your database name
  port: 5434,
});

//for drew 
/*
const pool = new Pool({
  user: 'drewamunateguiii', // replace with your postgres username
  host: 'localhost',
  database: 'drewamunateguiii', // replace with your database name
  port: 5433,
}); */

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Example route to greet
app.get('/api/greet', async (req, res) => {
    res.json({ message: 'Hello from the server'});
});

// Get all Teams
app.get('/api/fetch_all_teams', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Team'); 
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all Players
app.get('/api/fetch_all_players', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Player ORDER BY Position'); 
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



app.get('/api/get_players_by_team', async (req, res) => {
  try {
    const teamName = req.query.teamName; 
    if (!teamName) {
      return res.status(400).json({ error: 'Team name is required.' });
    }

    const result = await pool.query(`
      SELECT player.playerid, player.name, player.position, player.salary, player.fantasypoints
      FROM team 
      JOIN plays_for ON plays_for.teamid = team.teamid 
      JOIN player ON player.playerid = plays_for.playerid 
      WHERE team.name = $1
      ORDER BY player.position
    `, [teamName]);


    console.log(result);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/api/get_players_by_position', async (req, res) => {
  try {
    const position = req.query.position; // Corrected from req.query.teamName
    if (!position) {
      return res.status(400).json({ error: 'Position is required.' });
    }

    const result = await pool.query(`
      SELECT player.playerid, player.name, player.position, player.salary, player.fantasypoints
      FROM player 
      WHERE player.position = $1
      ORDER BY player.playerid
    `, [position]);

    console.log(result);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});




// Example route to get data from PostgreSQL
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM your_table'); // replace 'your_table' with your table name
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

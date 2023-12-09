// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'nicksmith', // replace with your postgres username
  host: 'localhost',
  database: 'nicksmith', // replace with your database name
  port: 5434,
});

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

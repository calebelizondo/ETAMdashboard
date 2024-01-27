const express = require('express');
const app = express(); 
const sqlite3 = require('sqlite3').verbose();
const PORT = 8080;
const path = require('path');
const ejs = require('ejs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../frontend')));

//serve frontend
app.get('/', (req, res) => {

    const args = {
      BACKEND_URL: process.env.BACKEND_URL,
      DEBUG: process.env.DEBUG
    }
    res.render(path.join(__dirname, '../frontend/index.ejs'), args);
});

// Endpoint for all programs
app.get('/get-all-trends', (req, res) => {

// Create a new database connection
  const db = new sqlite3.Database("admission_data.db");

  // Query to select all data from the admission_data table
  const query = 'SELECT * FROM admission_data';

  // Execute the query
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else {
      
      res.json(rows);
    }

    // Close the database connection
    db.close();
  });
});

// Endpoint for specific program
app.get('/get-specific-program', (req, res) => {
    res.send('Get specific program!');
});

app.listen(
    PORT, 
    () => console.log(`Server running on port ${PORT}`)
);

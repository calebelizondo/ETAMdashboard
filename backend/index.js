const express = require('express');
const app = express(); 
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const ejs = require('ejs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const PORT = 8080;

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

// Endpoint for initializing data (all programs, years to choose from)

app.get('/init-data', (req, res) => {
  const db = new sqlite3.Database("admission_data.db");

  var data = {
    years: [],
    programs: []
  };

  // Function to perform a database query and return a Promise
  function runQuery(query) {
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Run the queries sequentially using Promise.all
  Promise.all([
    runQuery('SELECT DISTINCT year FROM admission_data ORDER BY year DESC'),
    runQuery('SELECT DISTINCT program FROM admission_data ORDER BY program ASC')
  ]).then(([years, programs]) => {
    data.years = years;
    data.programs = programs;
    db.close();
    res.json(data);
  }).catch((err) => {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
    db.close();
  });
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

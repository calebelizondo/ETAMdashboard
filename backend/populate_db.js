const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const sqlite3 = require('sqlite3').verbose();

const databaseName = 'admission_data.db';
const csvFolder = 'admissionData'; 

// Function to create the database and table
function initializeDatabase() {
  const db = new sqlite3.Database(databaseName);

  // Create admission_data table
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS admission_data (
        year INTEGER,
        program TEXT,
        total_admits INTEGER,
        auto_admit INTEGER,
        first_choice_auto_entry INTEGER,
        first_choice_selected INTEGER,
        first_choice_denied INTEGER,
        second_choice_selected INTEGER,
        second_choice_denied INTEGER,
        third_choice_selected INTEGER,
        third_choice_denied INTEGER,
        fourth_and_fifth_choice_selected INTEGER,
        fourth_and_fifth_choice_denied INTEGER
      );
    `);
  });

  db.close();
}

// Function to parse and store CSV files in the database
function processCSVFile(filePath) {
    const db = new sqlite3.Database(databaseName);
  
    // Extract year from filename
    const yearFromFilename = parseInt(path.basename(filePath, '.csv'));
  
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Trim the keys (column names) in the row
        const trimmedRow = {};
        Object.keys(row).forEach((key) => {
          trimmedRow[key.trim()] = row[key];
        });
  
        // Log the 'Program' value to check if it's being read correctly
        console.log(`Program: ${trimmedRow['Program']}`);
  
        // Insert data into the database
        db.run(`
          INSERT INTO admission_data VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, [
          yearFromFilename,
          trimmedRow['Program'],
          trimmedRow['Total Admits'],
          trimmedRow['Auto-Entry'],
          trimmedRow['1Number Selected'],
          trimmedRow['1Number Denied'],
          trimmedRow['Second Choice'], 
          trimmedRow['2Selected'], 
          trimmedRow['3Selected'],
          trimmedRow['3Denied'],
          trimmedRow['4Selected'] || 0,
          trimmedRow['4Denied'] || 0
        ]);
      })
      .on('end', () => {
        console.log(`Data from ${filePath} inserted into the database.`);
        db.close();
      });

  }
  
  

// Function to check if the database exists and delete it
function checkAndDeleteDatabase() {
  if (fs.existsSync(databaseName)) {
    fs.unlinkSync(databaseName);
    console.log(`Database ${databaseName} deleted.`);
  }
}

// Check if the database exists and delete it
checkAndDeleteDatabase();

// Initialize the database and create the table
initializeDatabase();

// Iterate through CSV files in the folder
fs.readdirSync(csvFolder).forEach((file) => {
  if (file.endsWith('.csv')) {
    const filePath = path.join(csvFolder, file);
    processCSVFile(filePath);
  }
});

module.exports = {
    initializeDatabase,
    checkAndDeleteDatabase,
    processCSVFile,
  };
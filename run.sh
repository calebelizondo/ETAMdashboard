#!/bin/bash

cd backend
#install deps
npm install
#populate the database
node populate_db.js
#start server
node index.js
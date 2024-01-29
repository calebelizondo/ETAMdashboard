This repo defines a full-stack web dashboard, which allows users to view ETAM admission rates by year and program. 

## What is ETAM? 

Texas A&M Engineering does not admit students into any particular major intially. Instead they are all put into a "General Engineering" program.
After they get all of the credits required (which usually takes two semesters), they can apply to their intended major. Applicants will choose at least
their top-three choices and submit an essay. 

Each year there is an auto-admit cutoff. Students whose GPA is above the cutoff are automatically given a spot in their preferred major. This cutoff was 3.5 and is currently 3.75.
Admission policies can vary by year. See https://engineering.tamu.edu/academics/undergraduate/entry-to-a-major/index.html for more details.

## About the stack

This application can be broken down into a front and back end. The admission rates are stored in CSV files by year (see "./backend/admissionData/"). Upon startup, this data will
be migrated into a SQLite table. The data can then be accessed by an Express.js server and sent to the front end (see "./frontend"). The frontend is built using a simple combination of html, javascript and css.

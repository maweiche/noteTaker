//requires express module
const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = 3001;
const app = express();



//request data
const notes  = require('./db/db.json');

//function for taking data and adding it to db.json
function createNote (body, notesArray) {
    const note = body;
    notesArray.push(note);
}
//requires express module
const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();



app.use(express.urlencoded ( { extended: true}));
app.use(express.json());
app.use(express.static('public'));



//request data
const{ notes } = require('./db/db.json');

//function for taking data and adding it to db.json
function createNote (body, notesArray) {
    const note = body;
    notesArray.push(note);

    //write file
    fs.writeFileSync(path.join(__dirname, './data/db.json'), JSON.stringify({ notes : notesArray }, null, 2));
    console.log(note);
    return note;
};

//route get
app.get('/api/notes', (req, res) => {
    res.json(notes);
})

//route to server
app.post('/api/notes', (req, res) => {
    
})
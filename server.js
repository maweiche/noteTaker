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
    fs.writeFileSync(
        path.join(__dirname, './data/db.json'),
        JSON.stringify({ notes : notesArray }, null, 2)
    );
    console.log(note);
    return note;
};

//note validation
function validateNote (note) {
    if (!note.title || typeof note.title !== "string") {
        return false;
    }
    if (!note.text || typeof note.text !== "string") {
        return false;
    }
    return true;
};

//route get
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

//route to post notes to server
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    
});

//route to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//route to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//add listen method
app.listen(PORT, () => {
    console.log(`API active on port ${PORT}`);
});
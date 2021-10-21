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
function createNewNote (body, notesArray) {
    const note = body;
    notesArray.push(note);

    //write file
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
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

    //if data in req.body is wrong, send error
    if (!validateNote(req.body)) {
        res.status(400).send('Note is not formatted properly.');
    }else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

//delete notes
app.delete('/api/notes/:id', (req, res) =>{
    const id = req.params.id;
    let note;

    notes.map((element, index) => {
        if (element.id == id) {
            note = element
            notes.splice(index, 1)
            return res.json(note);
        }
    })
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
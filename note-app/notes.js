console.log('Starting notes.js');

var fs = require('fs');
var util = require('util');


module.exports = (function (_global) {

    var MessageProvider = function (title, body) {
        return new MessageProvider.Init(title, body);
    }

    function fetchNotes() {
        //  var res = fs.readFileSync('notes-data.json');
        return new Promise((resolve, reject) => {
            var readable = fs.createReadStream('./note-app/notes-data.json', { endcoding: 'utf8' });
            readable.on('data', (chunk) => {
                chunk ? resolve(chunk) : reject("Issue reading the file");
            });
            debugger;
        });
    }

    function saveNotes(notes) {
        //  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
        fs.createWriteStream('./note-app/notes-data.json', JSON.stringify(notes));
    }

    MessageProvider.prototype = {
        addNote: function () {
            var notes = [];
            var note = {
                title: this.title,
                body: this.body
            };
            try {
                fetchNotes()
                    .then((buffer) => notes = JSON.parse(buffer))
                    .catch(error => {
                        console.log(error);
                    });
                console.log(notes ? notes : "No notes found ");
                debugger;
            } catch (e) {
                console.log(e);
            }

            var checkDuplicate = notes.find((note => { note.title === this.title }));

            if (checkDuplicate !== undefined) {
                console.log("Found duplicate titles!!!");
                return;
            }
            notes.push(note);
            saveNotes(notes);
            util.log("Note created!!!");
            return this;
        },
        removeNote: function () {
            var notes = [];
            try {
                notes = fetchNotes();
            } catch (e) {
                console.log(e);
            }
            var note = notes.find(note => note.title === this.title);
            var idx = notes.indexOf(note);
            if (note !== undefined) {
                console.log(note);
                if (idx > -1)
                    notes.splice(idx, 1);
            } else {
                console.log("No such title found");
            }
            saveNotes(notes);
            debugger;
            return this;
        },
        displayNote: function () {
            var notes = fetchNotes();
            console.log("Total note(s): ", notes.length);
            notes.forEach((note) => console.log(`Title: ${note.title} Body: ${note.body}`));
        }
    }

    MessageProvider.Init = function (title, body) {
        var self = this;
        self.title = title || "No Title";
        self.body = body || "No Body";
    }

    MessageProvider.Init.prototype = MessageProvider.prototype;

    _global.MsgProvider = MessageProvider;

}(global));
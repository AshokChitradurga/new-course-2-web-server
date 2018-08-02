// var obj = {
//     name: 'Test'
// }

// var res = JSON.stringify(obj);
// console.log(typeof res);
// console.log(res);

// var personString = '{"name":"A1", "age":34}';
// var person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person);

var fs = require('fs');

var originalNote = {
    title: "Some title",
    body: "Some body"
}

var originalString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalString);

var notestring = fs.readFileSync('notes.json');
var note = JSON.parse(notestring);

console.log(typeof note);
console.log(note);
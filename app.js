var fs = require('fs');
var notes = [];

function fetchNotes() {
    return new Promise((resolve, reject) => {
        var readable = fs.createReadStream('./note-app/notes-data.json');
        readable.on('data', (chunk) => {
            chunk ? resolve(chunk) : reject("Issue reading the file");
        });
        debugger;
    });
}

fetchNotes()
    .then((buffer) => {
        //  console.log(JSON.parse(buffer));
        return JSON.parse(buffer); // I want to assign parsed buffer data to external variable.
    })
    .then((res) => notes = res)
    .catch(error => {
        console.log(error);
    })

console.log("Notes=>", notes)

setTimeout(() => console.log("Notes=>", notes), 3000);

 // Here i am getting undefined. How would I store the result of sucessfull result of resolve.

// var readable_1 = fs.createReadStream(__dirname + '/notes-data.json', { encoding: 'utf-8' });
// var res = {};
// readable_1.on('data', (chunk) => {
//     res = JSON.parse(chunk);
//     //  console.log(res);
// });
//  console.log("Result ", res.toString());
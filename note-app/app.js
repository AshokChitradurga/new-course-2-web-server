
console.log('Starting App')

const fs = require('fs');
const _ = require('lodash');
const note = require('./notes');
const yargs = require('yargs');


var args = yargs
    .command('add', 'Add a new note',
        {
            title: {
                describe: 'Title of note',
                demand: true,
                alias: 't'
            },
            body: {
                describe: 'Body of note',
                demand: true,
                alias: 'b'
            }
        }
    )
    .command('remove', 'Remove a note',
        {
            title: {
                describe: 'Title of note',
                demand: true,
                alias: 't'
            }
        }
    )
    .command('list', 'List notes')
    .help()
    .argv;

var command = args._[0];

if (command === 'add') {
    MsgProvider(args.title, args.body).addNote();
} else if (command === 'remove') {
    MsgProvider(args.title, args.body).removeNote();
} else if (command === "list") {
    MsgProvider().displayNote();
}
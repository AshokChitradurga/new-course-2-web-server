
const yargs = require('yargs');
console.log("Started!!!");
var config = require('../eventConfig');

var EventsEmitter = require('./EventsEmitter.js');
var emitter = Object.create(EventsEmitter);

// Events object created manually
//  var _register = $Events();
emitter.on(config.ADD, function () {
    console.log("Addition function called");
});
emitter.on(config.SUBSTRACT, function () {
    console.log("Substarct function called");
});
emitter.emit(config.ADD);
//  emitter.emit(config.SUBSTRACT);

console.log("Finished!!!");

//   Node.js event emitter
console.log('Events by Node.js.. started!!!')
var Emitter = require('events');
var emtr = new Emitter();
emtr.on('Add', function () {
    console.log("Addition function called by Node.js event");
});
emtr.emit('Add');
console.log('Events by Node.js.. finished!!!')

const request = require('request');
const argv = yargs
    .options({
        a: {
            alias: 'address',
            demand: true,
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedadress = encodeURIComponent(argv.address);
var weathergenerator = function (encodedadress, callback) {
    request(
        {
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedadress}`,
            json: true,
            rejectUnauthorized: false,
            requestCert: true
        }, (error, response, body) => {
            if (error) {
                callback(error);
            }
            else if (body.status === 'ZERO_RESULTS') {
                callback('Address invalid!!!');
            } else if (response.statusCode === 200) {
                callback(undefined, {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            };
        });
}

weathergenerator(encodedadress, (error, result) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("The Address: ", result.address);
        console.log("The latitude: ", result.latitude)
        console.log("The longitude: ", result.longitude)
    }
});

console.log('end async');
const request = require('request');
const yargs = require('yargs');

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

var geoaddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedadress}`,
            json: true,
            rejectUnauthorized: false,
            requestCert: true
        }, (error, response, body) => {
            if (error) {
                reject(error);
            }
            else if (body.status === 'ZERO_RESULTS') {
                reject('Address invalid!!!');
            } else if (response.statusCode === 200) {
                if (body.results[0]) {
                    resolve({
                        address: body.results[0].formatted_address,
                        latitude: body.results[0].geometry.location.lat,
                        longitude: body.results[0].geometry.location.lng
                    });
                }
                else {
                    reject("Details didn't find");
                }
            }
        });
    });
};

console.log("XKKK");

geoaddress(encodedadress)
    .then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    })
    .catch((error) => {
        console.log(error);
    })
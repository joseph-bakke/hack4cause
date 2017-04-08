const agent = require('superagent');
const moment = require('moment');
const _ = require('lodash');
const util = require('util');

module.exports = function (app) {
    const connections = app.get('connections');
    const cache = app.get('cache');
    const config = app.get('config');
    const db = connections.sqlite;

    // eslint-disable-next-line
    const geoLib = require('../lib/geocode')(app);

    // const config = app.get('config');

    app.get('/convert/address/latlong', function (req, res) {
        console.log('GET convert address to latlong endpoint called');
        const dbname = req.query.dbname;

        if (!dbname) {
            console.log('Must include dbname in query!');
            return res.status(400).send('Must include dbname in query');
        }

        console.log(`Querying dbname ${dbname}`);
        // if lat long values don't exist create them
        db.all(`SELECT lat from ${dbname} LIMIT 1`, function (err, response) {
            if (err) {
                console.log('Adding lat column to db');
                db.run(`ALTER TABLE ${dbname} ADD COLUMN lat TEXT`);
            } else {
                console.log(response);
                console.log('lat column exists');
            }
        });

        db.all(`SELECT lng from ${dbname} LIMIT 1`, function (err, response) {
            if (err) {
                console.log('Adding lng column to db');
                db.run(`ALTER TABLE ${dbname} ADD COLUMN lng TEXT`);
            } else {
                console.log(response);
                console.log('lng column exists');
            }
        });

        // iterate through db and convert addresses to lat long
        db.all(`SELECT  * FROM ${dbname}`, function (err, record) {
            if (err) {
                console.log(`error: ${err}`);
            }
            let count = 0;
            let updated = 0;
            record.forEach(function (row) {
                count++;
                // if lat long values are null call google api to convert

                console.log(`Converting address: ${row.address}`);

                if (row.lat == null || row.lng == null) {
                    geoLib.convertAddressToLatLong(`${row.address}, Eugene OR`)
                        .then(response => {
                            updated++;
                            console.log('Udpating db with values');
                            console.log(`UPDATE ${dbname} SET lat=${response.lat} WHERE address="${row.address}"`);
                            console.log(`UPDATE ${dbname} SET lng=${response.lng} WHERE address="${row.address}"`);
                            db.run(`UPDATE ${dbname} SET lat=${response.lat} WHERE address="${row.address}"`);
                            db.run(`UPDATE ${dbname} SET lng=${response.lng} WHERE address="${row.address}"`);
                            // res.status(200).send(response);
                        })
                        .catch(error => console.log(`ERROR OCCURRED AT API.JS: ${error}`));
                } else {
                    console.log('Skipping address, already has lat and lng');
                    console.log(row.address);
                }
            });

            res.status(200).send(`Found ${count} records, updated ${updated}`);
        });      
    });

    app.get('/connect', function (req, res) {
        console.log('Sending sample api request to google geocoding api');
        geoLib.convertAddressToLatLong('2700 CENTENNIAL BLVD, Eugene OR')
            .then(response => res.status(200).send(response))
            .catch(err => res.status(500).send(err));
    });
};

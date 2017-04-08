// const agent = require('superagent');

module.exports = function (app) {
    const connections = app.get('connections');
    const db = connections.sqlite;

    // eslint-disable-next-line
    const geoLib = require('../lib/geocode')(app);

    // const config = app.get('config');

    app.get('/convert/add/latlong', function (req, res) {
        console.log('GET test endpoint called');
        const dbname = 'employmentBP';

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
                    updated++;
                    geoLib.convertAddressToLatLong(`${row.address}, Eugene OR`)
                        .then(response => {
                            console.log('Udpating db with values');
                            console.log(`UPDATE ${dbname} SET lat=${response.lat} WHERE address="${row.address}"`);
                            console.log(`UPDATE ${dbname} SET lng=${response.lng} WHERE address="${row.address}"`);
                            db.run(`UPDATE ${dbname} SET lat=${response.lat} WHERE address="${row.address}"`);
                            db.run(`UPDATE ${dbname} SET lng=${response.lng} WHERE address="${row.address}"`);
                            // res.status(200).send(response);
                        })
                        .catch(error => res.status(500).send(error));  
                } else {
                    console.log('Skipping address, already has lat and lng');
                    console.log(row);
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

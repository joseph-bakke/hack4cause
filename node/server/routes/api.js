const agent = require('superagent');
const moment = require('moment');
const _ = require('lodash');
const util = require('util');
const Promise = require('bluebird');

module.exports = function (app) {
    const connections = app.get('connections');
    const cache = app.get('cache');
    const config = app.get('config');
    const db = connections.sqlite;

    // eslint-disable-next-line
    const geoLib = require('../lib/geocode')(app);

    function parseLocation(location) {
        console.log(`Parsing Location ${location}`);
        const parsed = location.split(' ');
        console.log(parsed.length);
        _.forEach(parsed, function (name) {
            console.log(name);
            // if name is special character, drop
            // if name is ST, AVE drop
            // if name equals W/S

            // save first instance that passes as street
            // save second instance that passes as crossStreet
        });

        const street = `${parsed[0]} ${parsed[1]}`;
        const crossStreet = `${parsed[2]} ${parsed[3]}`;

        // eslint-disable-next-line
        return {street: street, crossStreet: crossStreet};
    }

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

    app.get('/parking', function (req, res) {
        const dbname = 'parkingCit2007';

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

        db.all(`SELECT street from ${dbname} LIMIT 1`, function (err, response) {
            if (err) {
                console.log('Adding street column to db');
                db.run(`ALTER TABLE ${dbname} ADD COLUMN street TEXT`);
            } else {
                console.log(response);
                console.log('street column exists');
            }
        });

        db.all(`SELECT crossStreet from ${dbname} LIMIT 1`, function (err, response) {
            if (err) {
                console.log('Adding crossStreet column to db');
                db.run(`ALTER TABLE ${dbname} ADD COLUMN crossStreet TEXT`);
            } else {
                console.log(response);
                console.log('crossStreet column exists');
            }
        });

        // iterate through db and convert addresses to lat long
        db.all(`SELECT  * FROM ${dbname}`, function (err, record) {
            if (err) {
                console.log(`error: ${err}`);
            }
            let count = 0;
            let updated = 0;
            // db.run(`UPDATE ${dbname} SET lat=null`);
            // db.run(`UPDATE ${dbname} SET lng=null`);
            record.forEach(function (row) {
                count++;
                // if lat long values are null call google api to convert
                console.log(`Converting location: ${row.Location}`);
                const loc = parseLocation(row.Location);
                console.log(loc);

                console.log(`UPDATE ${dbname} SET street="${loc.street}" WHERE Location="${row.Location}"`);
                console.log(`UPDATE ${dbname} SET crossStreet="${loc.crossStreet}" WHERE Location="${row.Location}"`);
                // db.run(`UPDATE ${dbname} SET street="${loc.street}" WHERE Location="${row.Location}"`);
                // db.run(`UPDATE ${dbname} SET crossStreet="${loc.crossStreet}" WHERE Location="${row.Location}"`);
                updated++;

                // if (row.lat == null || row.lng == null) {
                //     geoLib.convertAddressToLatLong(`${loc.street} & ${loc.crossStreet}, Eugene OR`)
                //         .then(response => {
                //             console.log('Udpating db with values');
                //             console.log(`UPDATE ${dbname} SET lat=${response.lat} WHERE Location="${row.Location}"`);
                //             console.log(`UPDATE ${dbname} SET lng=${response.lng} WHERE Location="${row.Location}"`);
                //             db.run(`UPDATE ${dbname} SET lat=${response.lat} WHERE Location="${row.Location}"`);
                //             db.run(`UPDATE ${dbname} SET lng=${response.lng} WHERE Location="${row.Location}"`);

                //             updated++;
                //         })
                //         .catch(error => console.log(`ERROR OCCURRED AT API.JS: ${error}`));
                // } else {
                //     console.log('Skipping crossStreet, already has lat and lng');
                //     console.log(row.crossStreet);
                // }
            });
            // res.status(200).send('reset to null');
            res.status(200).send(`Found ${count} records, updated ${updated}`);
        });      
    });

    /**
     * Be careful hitting this endpoint because we only have 60 api calls a day and it uses 5 each time
     */
    app.get('/weather', function (req, res) {
        const cityId = config.weather.cityId;
        const weatherApiKey = config.weather.key;
        const currentEndpoint = config.weather.endpoints.current;

        let weatherData = [];

        const getHistoricalWeatherData = function () {
            const currentMoment = moment();
            const queryPromises = [];

            for (let i = 0; i < config.weather.defaultHistoricalYears; i++) {
                currentMoment.subtract(1, 'year').startOf('day');
                const start = currentMoment.unix();
                currentMoment.endOf('day');
                const end = currentMoment.unix();

                const queryPromise = Promise((resolve, reject) => {
                    agent
                        .get(currentEndpoint)
                        .query(`id=${cityId}&start=${start}&end=${end}&APPID=${weatherApiKey}`)
                        .end(function (err, response) {
                            if (err) {
                                reject(err);
                            }

                            resolve(response.body);
                        });
                });

                queryPromise.push(queryPromise);
            }

            return Promise.all(queryPromises);
        };

        getHistoricalWeatherData()
            .then(function (results) {
                weatherData = [].concat(results);

                return new Promise((resolve, reject) => {
                    agent
                        .get(currentEndpoint)
                        .query(`id=${cityId}&APPID=${weatherApiKey}`)
                        .end(function (err, response) {
                            if (err) {
                                reject(err);
                            }

                            resolve(response.body);
                        });
                });
            })
            .then(function (results) {
                weatherData = weatherData.concat([results]);
                res.status(200).send(weatherData);
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    });
};

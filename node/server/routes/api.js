const agent = require('superagent');
const moment = require('moment');
const _ = require('lodash');
const util = require('util');

module.exports = function (app) {
    const connections = app.get('connections');
    const cache = app.get('cache');
    const db = connections.sqlite;

    const config = app.get('config');

    app.get('/test', function (req, res) {
        console.log('GET test endpoint called');
        db.all('SELECT  * FROM employmentBP WHERE address = "2700 CENTENNIAL BLVD"', function (err, record) {
            if (err) {
                console.log(`error: ${err}`);
            }
            let count = 0;
            console.log(record);
            record.forEach(function (row) {
                count++;
                console.log(row);  
            });

            res.status(200).send(`Found ${count} records`); 
        });      
    });

    app.get('/connect', function (req, res) {
        console.log('Sending sample api request to google geocoding api');
        const address = encodeURI('1600 Amphitheatre Parkway, Mountain View, CA');
        agent
            .get('https://maps.googleapis.com/maps/api/geocode/json')
            .query(`address=${address}&key=${config.google.key}`)
            .end(function (err, response) {
                if (err) {
                    console.log('An error occurred:');
                    console.log(err);
                }

                console.log(response.body);
                res.status(200).send(response.body); 
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

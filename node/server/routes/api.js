const agent = require('superagent');

module.exports = function (app) {
    const connections = app.get('connections');
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
};

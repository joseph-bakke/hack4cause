const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const routes = require('./routes');

const app = express();

const buildApp = function (connections) {
    app.set('connections', connections);

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    routes(app);

    app.set('ready', true);

    app.listen(config.web.api.port, function () {
        app.set('ready', true);

        // Emit ready event (tests listen for this)
        app.emit('app:ready');
    });

    app.on('app:ready', function () {
        console.log('Application has successfully started and is ready to start receiving requests', 'Server');
    });
};

require('./lib/connections')(config)
    .then(function (connections) {
        buildApp(connections);
    })
    .catch(function (err) {
        console.log(err);
        process.exit(1);
    });

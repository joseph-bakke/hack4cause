const agent = require('superagent');
const Promise = require('bluebird');

module.exports = function (app) {
    const config = app.get('config');

    function convertAddressToLatLong(address) {
        const deferred = Promise.defer();
        console.log(`Sending request to google geocoding api for address ${address}`);
        const encodedAddress = encodeURI(address);
        agent
            .get('https://maps.googleapis.com/maps/api/geocode/json')
            .query(`address=${encodedAddress}&key=${config.google.key}`)
            .end(function (err, response) {
                if (err) {
                    console.log('An error occurred:');
                    console.log(err);
                    deferred.reject(err);
                }

                console.log(response.body.results[0].geometry.location);
                deferred.resolve(response.body.results[0].geometry.location);
            });
        return deferred.promise;
    }

    return {
        convertAddressToLatLong
    };
};

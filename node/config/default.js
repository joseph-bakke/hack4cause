const keys = require('./keys.json');
const path = require('path');

const projectDir = path.resolve(__dirname, '../');

module.exports = {
    google: {
        key: keys.google
    },
    weather: {
        key: keys.weather,
        cityId: '5725846',
        defaultHistoricalYears: 4,
        endpoints: {
            historical: 'http://history.openweathermap.org/data/2.5/history/city',
            current: 'http://api.openweathermap.org/data/2.5/weather'
        }
    },
    db: {
        path: path.resolve(projectDir, './data/db.sqlite')
    },
    web: {
        api: {
            port: 3000
        }
    },
    cache: {
        defaultTtl: 1440
    }
};

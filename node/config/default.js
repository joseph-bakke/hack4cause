const keys = require('./keys.json');
const path = require('path');

const projectDir = path.resolve(__dirname, '../');

module.exports = {
    google: {
        key: keys.google
    },
    db: {
        path: path.resolve(projectDir, './data/db.sqlite')
    },
    web: {
        api: {
            port: 3000
        }
    }
};

const path = require('path');

const projectDir = path.resolve(__dirname, '../../');

module.exports = {
    db: {
        path: path.resolve(projectDir, './data/db.sqlite')
    },
    web: {
        api: {
            port: 3001
        }
    },
    cache: {
        defaultTtl: 1440
    }
};

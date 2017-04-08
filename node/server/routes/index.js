const _ = require('lodash');
const fs = require('fs');

// TODO get rid of this stuff
const getRoutes = function (path) {
    const routes = [];
    const traverseFileSystem = function (currentPath) {
        const files = fs.readdirSync(currentPath);
        // eslint-disable-next-line
        for (const i in files) {
            // eslint-disable-next-line
            if (files.hasOwnProperty(i)) {
                const currentFile = `${currentPath}/${files[i]}`;
                const stats = fs.statSync(currentFile);
                if (stats.isFile() && (/\.(js)$/i).test(currentFile) && currentFile !== __filename) {
                    routes.push(currentFile);
                } else if (stats.isDirectory() && files[i] !== 'utils') {
                    traverseFileSystem(currentFile);
                }
            }
        }
    };
    traverseFileSystem(path);
    return routes;
};

const routes = getRoutes(__dirname);

module.exports = function (app) {
    // Hook up the routes contained in the subdirs within routes
    _.forEach(routes, function (route) {
        // eslint-disable-next-line
        require(route)(app);
    });
};

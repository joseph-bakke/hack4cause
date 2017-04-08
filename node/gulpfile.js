const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const exit = require('gulp-exit');

gulp.task('default', function () {
    nodemon({
        script: './server/app.js',
        ext: 'html js',
        ignore: ['node_modules/**', 'test/**', 'client/**']
    })
    .on('restart', function () {
        console.log('restarted!');
    });
});
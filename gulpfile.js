// gulpfile.js

var gulp = require('gulp');
var nodemon = require('nodemon');

gulp.task('server', function() {
  nodemon({ script: 'tessr.js' });
});

gulp.task('default', ['server']);

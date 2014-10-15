// gulpfile.js

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

// Configuration:
var kPaths = {
  VIEWS: 'views/*.jade',
  ROUTES: 'routes/*.js',
  SERVER: 'tessr.js'
};

// server:
//   Start tessr server using nodemon to watch for changes and restart as
//   necessary.  Pass restarts on to browserSync.
gulp.task('server', function(done) {
  // nodemon will re-run the given script when the paths under watch change.
  // By default it only watches the current directory.  Add also any backend
  // paths here.  NOTE: template paths should NOT be added here as they do not
  // require an express server restart.
  nodemon({
    script: 'tessr.js',
    watch: [kPaths.ROUTES, kPaths.SERVER]
  }).on('start', handleStart);

  function handleStart() {
    if (!browserSync.active) {
      browserSync({
        proxy: 'localhost:3000',
        port: 5000,
      }, done);
    } else {
      console.log('Server reloaded but I cannot automatically reload');
    }
  }
});

// watch:
//   Watch paths of interest not already handled by nodemon and reload
//   browser-sync when they change.
gulp.task('watch', function() {
  gulp.watch(kPaths.VIEWS, browserSync.reload);
});


// By default: start the tessr server and watch for changes.
gulp.task('default', ['server', 'watch']);

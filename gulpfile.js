/**
 * @author {Ruth Hutchins}
 */
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

// Configuration:
var kPaths = {
  // Jade templates for views served by express.
  VIEWS: 'views/*.jade',

  // Handlers for routes served by express.
  ROUTES: 'routes/*.js',

  // Main express server file.
  SERVER: 'tessr.js'
};

// server:
//   Start tessr server using nodemon to watch for changes and restart as
//   necessary.  On the first start, also start up browser-sync.
gulp.task('server', function(done) {
  nodemon({
    // nodemon will re-run the given script when the paths under watch change.
    script: 'tessr.js',

    // By default it only watches the current directory.  Add also any backend
    // paths here.  NOTE: template paths should NOT be added here as they do not
    // require an express server restart.
    watch: [kPaths.ROUTES, kPaths.SERVER]
  }).on('start', handleStart);

  // Once nodemon starts the server, start browser-sync if it isn't already
  // active.
  function handleStart() {
    if (!browserSync.active) {
      browserSync({
        proxy: 'localhost:3000',
        port: 5000,
      }, done);
    }

    // TODO(rdhutchins): Right now it seems that browser-sync reload does
    // nothing if the proxied server has restarted underneath it.
    // browserSync.exit() kills everything including the gulp task.  Still
    // looking for a way to stop and re-start browser-sync if the express server
    // restarts.
  }
});

// watch:
//   Watch paths of interest that don't require a backend restart and reload
//   browser-sync when they change.
gulp.task('watch', function() {
  gulp.watch(kPaths.VIEWS, browserSync.reload);
});

// By default: start the tessr server and watch for changes.
gulp.task('default', ['server', 'watch']);

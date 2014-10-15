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
      startBrowserSync(done);
    } else {
      stopAndStartBrowserSync();
    }
  }

  // Stop browser sync and then start it.
  function stopAndStartBrowserSync() {
    console.log('Cleaning up previous browserSync and starting afresh.');
    browserSync.instance.cleanup();
    startBrowserSync();
  }

  // Start browser-sync, but save the instance so that we can clean it up later
  // when we need to.
  function startBrowserSync(opt_cb) {
    browserSync.instance = browserSync.init(null, {
      proxy: 'localhost:3000',
      port: 5000,
      logLevel: 'debug',
      logConnections: true
    }, opt_cb);
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

var gulp = require('gulp');
var watch = require('gulp-watch');

// where are we running?
var path = require("path");
var cwd = path.dirname(__filename);

/**
 * Browserify bundling of gallery app.
 */
gulp.task('bundle-gallery', function() {
  var browserify = require('browserify');
  var transform = require('vinyl-transform');
  var reactify = require('reactify');
  var to5ify = require("6to5ify");
  var source = require('vinyl-source-stream');

  // Don't process react. We'll link to its CDN minified version.
  // The reasoning here is that we're not offering one app, we're
  // offering lots of apps, and bundling react with each app is
  // both bloat, and an uncachable resource. Both are bad.
  var donottouch = require('browserify-global-shim').configure({
    'react': 'React'
  });

  return browserify(cwd + '/components/gallery-app.jsx')
    .transform(to5ify)
    .transform(reactify)
    .transform(donottouch)
    .bundle()
    .pipe(source('gallery-app.js'))
    .pipe(gulp.dest(cwd + '/build/'));
});


/**
 * Minify gallery app
 */
gulp.task('minify-gallery', ['bundle-gallery'], function() {
  var uglify = require('gulp-uglify');

  return gulp.src(cwd + '/build/gallery-app.js')
    .pipe(uglify())
    .pipe(gulp.dest(cwd + '/public/javascript'));
});


// used in both the lint and watch tasks
var jsxSrc = cwd + '/components/**/*.js*';


/**
 * Javascript and JSX linting
 */
gulp.task('lint-gallery', function() {
  // set up jshint to make use of jshint-jsx, as we're mixing
  // plain javascript with React's JSX.
  var jshint = require('gulp-jshint');
  var jsxhinter = require('jshint-jsx');
  jsxhinter.JSHINT = jsxhinter.JSXHINT;

  return gulp.src(jsxSrc)
    .pipe(jshint({
      linter: 'jshint-jsx',
      esnext: true
    }))
    .pipe(jshint.reporter('default'));
});


/**
 * JavaScript style validation, using JSCS
 */
gulp.task('jscs-gallery', function() {
  var jsxcs = require("gulp-jsxcs");
  return gulp.src("component/**/*.jsx")
    .pipe(jsxcs())
    .pipe(process.stdout);
});


/**
 * our "default" task runs everything, but -crucially- it
 * runs the subtasks in order. That means we'll wait for
 * files to be written before we move on to the next task,
 * because in this case we can't run parallel tasks.
 */
gulp.task('gallery', ['lint-gallery', 'jscs-gallery', 'minify-gallery']);


gulp.task('run-gallery', function() {
  var liveServer = require("live-server");
  var dir = cwd + "/public";
  var suppressBrowser = false;
  liveServer.start(55556, dir, suppressBrowser);
});

/**
 * Automatic rebuilding when .jsx files are changed
 */
gulp.task('watch-gallery', function() {
  watch(jsxSrc, function() { gulp.start('lint-gallery'); });
  watch(jsxSrc, function() { gulp.start('minify-gallery'); });
});

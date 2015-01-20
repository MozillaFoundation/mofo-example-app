var gulp = require('gulp');

// where are we running?
var path = require("path");
var cwd = path.dirname(__filename);


// Don't process react. We'll link to its CDN minified version.
// The reasoning here is that we're not offering one app, we're
// offering lots of apps, and bundling react with each app is
// both bloat, and an uncachable resource. Both are bad.
var donottouch = require('browserify-global-shim').configure({
  'react': 'React'
});

/**
 * Browserify bundling of gallery app.
 */
gulp.task('bundle-gallery', function() {
  var browserify = require('browserify');
  var transform = require('vinyl-transform');
  var reactify = require('reactify');
  var source = require('vinyl-source-stream');

  // Don't process react. We'll link to its CDN minified version.
  // The reasoning here is that we're not offering one app, we're
  // offering lots of apps, and bundling react with each app is
  // both bloat, and an uncachable resource. Both are bad.
  var donottouch = require('browserify-global-shim').configure({
    'react': 'React'
  });

  return browserify(cwd + '/components/gallery-app.jsx')
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


/**
 * Javascript and JSX linting
 */
gulp.task('lint-gallery', function() {
  // set up jshint to make use of jshint-jsx, as we're mixing
  // plain javascript with React's JSX.
  var jshint = require('gulp-jshint');
  var jsxhinter = require('jshint-jsx');
  jsxhinter.JSHINT = jsxhinter.JSXHINT;

  return gulp.src(cwd + '/components/**/*.js*')
    .pipe(jshint({ linter: 'jshint-jsx' }))
    .pipe(jshint.reporter('default'));
});


/**
 * our "default" task runs everything, but -crucially- it
 * runs the subtasks in order. That means we'll wait for
 * files to be written before we move on to the next task,
 * because in this case we can't run parallel tasks.
 */
gulp.task('gallery', ['lint-gallery', 'minify-gallery']);

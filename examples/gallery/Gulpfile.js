var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');


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
  return browserify('./components/gallery-app.jsx')
    .transform(reactify)
    .transform(donottouch)
    .bundle()
    .pipe(source('gallery-app.js'))
    .pipe(gulp.dest('./build/'));
});


/**
 * Minify gallery app
 */
gulp.task('minify-gallery', ['bundle-gallery'], function() {
  return gulp.src('./build/gallery-app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/javascript'));
});


/**
 * Javascript and JSX linting
 */
gulp.task('lint', function() {
  // set up jshint to make use of jshint-jsx, as we're mixing
  // plain javascript with React's JSX.
  var jshint = require('gulp-jshint');
  var jsxhinter = require('jshint-jsx');
  jsxhinter.JSHINT = jsxhinter.JSXHINT;

  return gulp.src([
      './components/**/*.js*'
     ])
    .pipe(jshint({ linter: 'jshint-jsx' }))
    .pipe(jshint.reporter('default'));
});


/**
 * our "default" task runs everything, but -crucially- it
 * runs the subtasks in order. That means we'll wait for
 * files to be written before we move on to the next task,
 * because in this case we can't run parallel tasks.
 */
gulp.task('default', ['lint', 'minify-gallery'], function() {
  console.log("Finishing packing up.");
});

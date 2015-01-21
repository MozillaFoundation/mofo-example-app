var gulp = require('gulp');
var watch = require('gulp-watch');

// where are we running?
var path = require("path");
var cwd = path.dirname(__filename);


/**
 * Browserify bundling of editor app.
 */
gulp.task('bundle-editor', function() {
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

  return browserify(cwd + '/components/editor-app.jsx')
    .transform(reactify)
    .transform(donottouch)
    .bundle()
    .pipe(source('editor-app.js'))
    .pipe(gulp.dest(cwd + '/build/'));
});


/**
 * Minify editor app
 */
gulp.task('minify-editor', ['bundle-editor'], function() {
  var uglify = require('gulp-uglify');

  return gulp.src(cwd + '/build/editor-app.js')
    .pipe(uglify())
    .pipe(gulp.dest(cwd + '/public/javascript'));
});


// used in both the lint and watch tasks
var jsxSrc = cwd + '/components/**/*.js*';


/**
 * Javascript and JSX linting
 */
gulp.task('lint-editor', function() {
  // set up jshint to make use of jshint-jsx, as we're mixing
  // plain javascript with React's JSX.
  var jshint = require('gulp-jshint');
  var jsxhinter = require('jshint-jsx');
  jsxhinter.JSHINT = jsxhinter.JSXHINT;

  return gulp.src(jsxSrc)
    .pipe(jshint({ linter: 'jshint-jsx' }))
    .pipe(jshint.reporter('default'));
});


/**
 * our "default" task runs everything, but -crucially- it
 * runs the subtasks in order. That means we'll wait for
 * files to be written before we move on to the next task,
 * because in this case we can't run parallel tasks.
 */
gulp.task('editor', ['lint-editor', 'minify-editor']);


/**
 * Automatic rebuilding when .jsx files are changed
 */
gulp.task('watch-editor', function() {
  watch(jsxSrc, function() { gulp.start('lint-editor'); });
  watch(jsxSrc, function() { gulp.start('minify-editor'); });
});

var gulp = require('gulp');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');

// where are we running?
var path = require("path");
var cwd = path.dirname(__filename);
var jsxSrc = [
  cwd + '/components/**/*.js*',
  cwd + '/lib/**/*.js',
  cwd + '/mixins/**/*.js'
];
var lessSrc = cwd + '/less/*.less';

/**
 * Browserify bundling of app.
 */
gulp.task('bundle-app', function() {
  var browserify = require('browserify');
  var transform = require('vinyl-transform');
  var reactify = require('reactify');
  var to5ify = require("6to5ify");
  var source = require('vinyl-source-stream');

  // Make sure we point to the dist/react.min.js version of react
  var donottouch = require('browserify-global-shim').configure({
    'react': 'require("react/dist/react.min")'
  });

  return browserify(cwd + '/components/app.jsx')
    .transform(to5ify)
    .transform(reactify)
     //.transform(donottouch)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(cwd + '/build/'));
});


/**
 * Minify app
 */
gulp.task('minify-app', ['bundle-app'], function() {
  var uglify = require('gulp-uglify');

  return gulp.src(cwd + '/build/app.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cwd + '/public/javascript'));
});


/**
 * Javascript and JSX linting
 */
gulp.task('lint-app', function() {
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
gulp.task('jscs-app', function() {
  var jsxcs = require("gulp-jsxcs");
  return gulp.src("component/**/*.jsx")
    .pipe(jsxcs())
    .pipe(process.stdout);
});


/**
 * LESS conversion to .css
 */
gulp.task('less-app', function() {
  var less = require('gulp-less');
  var plumber = require('gulp-plumber');

  return gulp.src(lessSrc)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(cwd + '/public/stylesheets'));
});


/**
 * our "default" task runs everything, but -crucially- it
 * runs the subtasks in order. That means we'll wait for
 * files to be written before we move on to the next task,
 * because in this case we can't run parallel tasks.
 */
gulp.task('app', ['lint-app', 'jscs-app', 'minify-app', 'less-app']);


/**
 * Automatic running of a live-server for the app
 */
gulp.task('run-app', function() {
  var liveServer = require("live-server");
  var dir = cwd + "/public";
  var suppressBrowser = false;
  liveServer.start(8080, dir, suppressBrowser);
});


/**
 * Automatic rebuilding when .jsx or .less files are changed
 */
gulp.task('watch-app', function() {
  // Changes relevant to react:
  watch(jsxSrc, function() { gulp.start('lint-app'); });
  watch(jsxSrc, function() { gulp.start('minify-app'); });
  // Style changes:
  watch(lessSrc, function() { gulp.start('less-app'); });
});

var gulp = require('gulp');

// where are we running?
var path = require("path");
var cwd = path.dirname(__filename);

/**
 * LESS compilation is independent of any other task
 */
gulp.task('less', function() {
  var less = require('gulp-less');
  var plumber = require('gulp-plumber');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src(cwd + '/less/*.less')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(cwd + '/../examples/editor/public/stylesheets'))
      .pipe(gulp.dest(cwd + '/../examples/gallery/public/stylesheets'));
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
      cwd + '/components/**/*.jsx',
      cwd + '/lib/**/*.js',
      cwd + '/mixins/**/*.js*'
     ])
    .pipe(jshint({ linter: 'jshint-jsx' }))
    .pipe(jshint.reporter('default'));
});

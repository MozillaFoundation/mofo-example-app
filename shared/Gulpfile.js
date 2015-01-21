var gulp = require('gulp');
var watch = require('gulp-watch');

// where are we running?
var path = require("path");
var cwd = path.dirname(__filename);

// used in both the less and watch-less tasks
var lessSRC = cwd + '/less/*.less';

/**
 * LESS compilation is independent of any other task
 */
gulp.task('less', function() {
  var less = require('gulp-less');
  var plumber = require('gulp-plumber');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src(lessSRC)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(cwd + '/../examples/editor/public/stylesheets'))
      .pipe(gulp.dest(cwd + '/../examples/gallery/public/stylesheets'));
});

// used in both the lint and watch-lint tasks
var lintSRC = [
  cwd + '/components/**/*.jsx',
  cwd + '/lib/**/*.js',
  cwd + '/mixins/**/*.js*'
];

/**
 * Javascript and JSX linting
 */
gulp.task('lint', function() {
  // set up jshint to make use of jshint-jsx, as we're mixing
  // plain javascript with React's JSX.
  var jshint = require('gulp-jshint');
  var jsxhinter = require('jshint-jsx');
  jsxhinter.JSHINT = jsxhinter.JSXHINT;

  return gulp.src(lintSRC)
    .pipe(jshint({ linter: 'jshint-jsx' }))
    .pipe(jshint.reporter('default'));
});


/**
 * Watcher task for recompiling less when necessary
 */
gulp.task('watch-less', function() {
  watch(lessSRC, function() { gulp.start('less'); });
});

/**
 * Watcher task for relinting when necessary
 */
gulp.task('watch-lint', function() {
  watch(lintSRC, function() { gulp.start('lint'); });
});

/**
 * Aggregated watch task for shared dependencies,
 * This task is called in the master watch task.
 */
gulp.task('watch-shared', ['watch-less', 'watch-lint']);

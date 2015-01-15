var gulp = require('gulp');
var concat = require('gulp-concat');

/**
 * Browserify bundling only.
 */
gulp.task('react', function() {
  var browserify = require('browserify');
  var transform = require('vinyl-transform');
  var reactify = require('reactify');
  var source = require('vinyl-source-stream');

  // Don't process react. We'll link to its CDN minified version.
  // This is
  var donottouch = require('browserify-global-shim').configure({
    'react': 'React'
  });

  return browserify('./react/ui.jsx')
    .transform(reactify)
    .transform(donottouch)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/react'));
});

/**
 * Minify everything, using uglify.
 */
gulp.task('minify', ['react'], function() {
  var uglify = require('gulp-uglify');
  return gulp.src('./build/react/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/javascript'));
});

/**
 * LESS compilation is independent of any other task
 */
gulp.task('less', function() {
  var less = require('gulp-less');
  var plumber = require('gulp-plumber');
  var sourcemaps = require('gulp-sourcemaps');
  return gulp.src('./public/stylesheets/*.less')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./public/stylesheets'));
});

/**
 * our "default" task runs everything, but -crucially- it
 * runs the subtasks in order. That means we'll wait for
 * files to be written before we move on to the next task,
 * because in this case we can't run parallel tasks.
 */
gulp.task('default', ['less', 'minify'], function() {
  console.log("Finishing packing up.");
});

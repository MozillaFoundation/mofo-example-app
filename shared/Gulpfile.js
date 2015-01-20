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


/**
 * LESS compilation is independent of any other task
 */
gulp.task('less', function() {
  return gulp.src('./less/*.less')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./examples/editor/public/stylesheets'))
      .pipe(gulp.dest('./examples/gallery/public/stylesheets'));
});


/**
 * our "default" task runs everything, but -crucially- it
 * runs the subtasks in order. That means we'll wait for
 * files to be written before we move on to the next task,
 * because in this case we can't run parallel tasks.
 */
gulp.task('default', ['less'], function() {
  console.log("Finishing packing up.");
});

var gulp = require("gulp");

// where are we running?
var path = require("path");
var cwd = path.dirname(__filename);

/**
 * Javascript and JSX linting
 */
gulp.task("lint-api", function() {
  var jshint = require("gulp-jshint");

  return gulp.src(cwd + "/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

/**
 * JavaScript style validation, using JSCS
 */
gulp.task("jscs-api", function() {
  var jsxcs = require("gulp-jsxcs");
  return gulp.src("**/*.js*")
    .pipe(jsxcs())
    .pipe(process.stdout);
});



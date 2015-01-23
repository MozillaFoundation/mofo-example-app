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
//  var jshint = require("gulp-jshint");
//  var jsxcs = require("gulp-jsxcs");
//  return gulp.src(cwd + "**/*.js*")
//    .pipe(jsxcs())
//    .pipe(jshint.reporter("default"));
});

/**
 *
 */
gulp.task("api-server", ["lint-api", "jscs-api"]);


// Run the api server, so that people don"t need
// to do this manually, but it can be one of the
// things that happen in "gulp watch".
gulp.task("run-api", function() {
  var server = require("gulp-express");
  server.run({ file: cwd + "/api-server.js" });
});


var gulp = require('gulp');

// This is a realy cool thing about gulp:
require('./app/Gulpfile');

// build things, without any kind of watching.
gulp.task('build', ['app']);

// watch things, without any kind of building.
gulp.task('watch-only', ['watch-app', 'run-app']);

// Meta watcher: start a build run and watch the files for individual
// apps, as well as shared resources that require linting/compilation.
gulp.task('watch', ['build','watch-only']);

// our "default" task runs everything, but -crucially- it
// runs the subtasks in order. That means we'll wait for
// files to be written before we move on to the next task,
// because in this case we can't run parallel tasks.
gulp.task('default', ['build']);

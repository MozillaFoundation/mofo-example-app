var gulp = require('gulp');

// This is a realy cool thing about gulp:
require('./examples/api-server/Gulpfile');
require('./examples/editor/Gulpfile');
require('./examples/gallery/Gulpfile');
require('./shared/Gulpfile');

// build things, don't watch
gulp.task('build', ['less', 'lint', 'jscs', 'api-server', 'gallery', 'editor']);

// watch things, don't build
gulp.task('watch-only', ['watch-gallery', 'watch-editor', 'watch-shared', 'run-api', 'run-editor', 'run-gallery']);

/**
 * Meta watcher: start a build run and watch the files for individual
 * apps, as well as shared resources that require linting/compilation.
 */
gulp.task('watch', ['build','watch-only']);

/**
 * our "default" task runs everything, but -crucially- it
 * runs the subtasks in order. That means we'll wait for
 * files to be written before we move on to the next task,
 * because in this case we can't run parallel tasks.
 */
gulp.task('default', ['build']);

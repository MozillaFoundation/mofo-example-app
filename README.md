# The  Mozilla Foundation Client-Side Prototype 

Clone this repository if you're starting a new MoFo client-side application.

The repo contains all the technologies we talk about in the [MoFo Engineering Handbook](https://github.com/MozillaFoundation/MoFo-Engineering-Handbook) and contains an example application that you can use as springboard to develop your own application on, by rewriting the bits that are in the example application to suit your needs, and extending it in accordance with the policies and guides outlined in the handbook.

**Note**: This repo is still under development.

## Using the current implementation

Clone this repo, then run `npm install` to get everything set up.

## Development with live reloading

For a tight feedback loop between code changes and updates in the browser, the code uses `gulp` for compilation and `gulp watch` for looking for file changes that will kick off recompiles.

If you just want to compile run `$> gulp`. For convenient dev work, you can use `$> gulp watch` instead, which will run the build tasks as well as set up file change watching on the app and shared directories, automatically starting up a live-reloading server for the gallery/editor apps.

Editing any .less or .jsx code should result in live recompiles, with the browser automatically updating thanks to the magic of live-server's use of websockets.

## Current implementation details

This repo currently implements a single client-side applications, consuming data from file, rather than from an API endpoint. Its code is found in the `app` directory, with most subdirectories named intuitively. The actual "deploy" content gets written to the `app/public` directory. As the app is built using [React](http://facebook.github.io/react) most of the important code can be found in the `components` and `mixins` directories.

If the [Webmaker Login service](http://github.com/mozilla/login.webmaker.org) is running (on port 3000), webmaker login is used to control whether or not "tiles" have editable titles and author fields.

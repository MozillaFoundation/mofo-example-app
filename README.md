# The  Mozilla Foundation Client-Side Prototype 

Clone this repository if you're starting a new MoFo client-side application.

The repo contains all the technologies we talk about in the [MoFo Engineering Handbook](https://github.com/MozillaFoundation/MoFo-Engineering-Handbook)
and contains an example application that you can use as springboard
to develop your own application on, by rewriting the bits that are
in the example application to suit your needs, and extending it
in accordance with the policies and guides outlined in the handbook.

**Note**: This repo is still under development.

## Using the current implementation

Clone this repo, then run `npm install` to get everything set up.

## Development with live reloading

For a tight feedback loop between code changes and updates in the browser, the
code uses `gulp` for compilation and `gulp watch` for looking for file changes
that will kick off recompiles.

The current live reloading dev setup consists of:

- general first build: `$> gulp`.
- watch all the things: `$> gulp watch`.

The watch task runs the api-server, as well as the gallery (automatically
opening the site in the browser) and the editor (not autoamtically opening
in the browser).

Editing any .less or .jsx code should result in live recompiles, with the browser
automatically updating thanks to the magic of live-server's use of websockets.


For finer grained control, the following dedicated watch tasks are available:

- `gulp watch-gallery` watches only changes rooted in the `examples/gallery' directory.
- `gulp watch-editor` watches only changes rooted in the `examples/editor' directory.
- `gulp watch-shared` watches only changes rooted in the `shared' directory.
  - `gulp watch-less` watches only changes rooted in the `shared/less' directory.
  - `gulp watch-lint` watches only changes for `*.js*` rooted in the `shared` directory.


## Current implementation details

This repo currently implements three applications, performing different
roles. Applications used are:

### 1) An API server

  The API server lives in the `./examples/api-servers` directory, and is a
  mock implementation right now, servicing three API endpoints.

There are two GET endpoints:

  `/api/1.0/findAll` serves data for all known "makes"
  `/api/1.0/entry/{makeid}` serves data for individual "make"

And one POST endpoint:

  `/api/1.0/crupdate` takes a make as POST payload, and will
  either create or update a make based on the make.id value
  found in the posted data.

Run the API server by using `node api-server` in the root dir.

**note:** as a true mock server, we don't use any form of ORM
yet, nor is the choice of server libraries/technology finalised.

(The mock server is currently implemented as an Express server)

### 2) A gallery app

The gallery app is a React UI application, with its root component
defined in `./examples/gallery/components/gallery-app.jsx`. To find
all the components it relies on, follow the trail of `require` calls
to the relevant bits and pieces, some of which is in `./shared`.

The gallery app as a running app in the browser has zero server
side components: the app simply makes use of the API server to
get its content; in this case the list of all makes, which it then
presents to the user in a grid like fashion.

Localizable data is currently localised for MirrorLand inhabitants,
with all strings reversed. We'll be tying a more suitable locale
switching mechanis into this, but for now it demonstrates how
we can do localisation, and has a few practical hooks and functions
that we can build on top of.

Each make in the grid has a link that lets you load the make in
the make editor, which is app three

### 3) An editor app

The editor app is a React UI application, with its root component
defined in `./examples/editor/components/editor-app.jsx`. To find
all the components it relies on, follow the trail of `require` calls
to the relevant bits and pieces, some of which is in `./shared`.

The editor uses the API server to load individual makes in an
editable way, with the static view offering an "edit" button,
which switches the editor to editing view, in which certain
make aspects can be changed, with a "save" button that will
tell the API server to update the make record with the new values.

Reloading the gallery after makes are saved in the editor will
reflect the latest saved data.

Clone this repository if you're starting a new MoFo application.

The repo contains all the technologies we talk about in the [MoFo Engineering Handbook](https://github.com/MozillaFoundation/MoFo-Engineering-Handbook)
and contains an example application that you can use as springboard
to develop your own application on, by rewriting the bits that are
in the example application to suit your needs, and extending it
in accordance with the policies and guides outlined in the handbook.


## For deployment, the following libraries are currently used:

npm:
- express (mostly for servicing /public and demonstrator API endpoints)
- react (UI framework)
- page (simple routing)

bower:
- makerstrap (for webmaker styling)

## For development, the following libraries are currently used:

- gulp (build automation)
- browserify (bundling)
- bower (for installing client side dependencies)
- jsxhint (a jsx-wrapper around jshint for code linting)
- LESS (general CSS)

# Contribution Guidelines

## Reporting issues

- **Search for existing issues.** Please check to see if someone else has reported the same issue.
- **Share as much information as possible.** Include operating system and version, browser and version. Also, include steps to reproduce the bug.

## Project Setup

Refer to the [README](#TODO-README_URL_HERE).

## Code Style

### JavaScript

JS files must pass JSHint using the provided [.jshintrc](#TODO-JSHINTRC_URL_HERE) settings.

Additionally, JS files need to be run through [JSBeautify](https://github.com/einars/js-beautify) with the provided [.jsbeautifyrc](#TODO-JSBEAUTIFY_URL_HERE).

**TL;DR** Run `gulp clean` before pushing a commit. It will validate and beautify your JS.

#### Variable Naming

- `lowerCamelCase` General variables
- `UpperCamelCase` Constructor functions
- Use semantic and descriptive variables names (e.g. `colors` *not* `clrs` or `c`). Avoid abbreviations except in cases of industry wide usage (e.g. `AJAX` and `JSON`).

### HTML

- 2 space indentation
- Class names use hypenated case (e.g. `my-class-name`)

### LESS / CSS

- 2 space indentation
- Always a space after a property's colon (e.g. `display: block;` *not* `display:block;`)
- End all lines with a semi-colon
- For multiple, comma-separated selectors, place each selector on it's own line

## Testing

Any patch should be tested in as many of our [supported browsers](#TODO-SUPPORTED_BROWSER_URL_HERE) as possible. Obviously, access to all devices is rare, so just aim for the best coverage possible. At a minimum please test in all available desktop browsers.

## Pull requests

- Try not to pollute your pull request with unintended changes – keep them simple and small. If possible, squash your commits.
- Try to share which browsers and devices your code has been tested in before submitting a pull request.
- If your PR resolves an issue, include **closes #ISSUE_NUMBER** in your commit message (or a [synonym](https://help.github.com/articles/closing-issues-via-commit-messages)).

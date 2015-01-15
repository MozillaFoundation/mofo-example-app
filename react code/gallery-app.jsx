var React = require('react');
var Gallery = require('./components/Gallery.jsx');
var settings = require('../settings');

React.render(<Gallery settings={settings} />, document.getElementById("gallery-app"));

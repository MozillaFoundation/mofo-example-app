var React = require('react');
var Gallery = require('./Gallery.jsx');
var settings = require('./../../../shared/settings');

React.render(
  <Gallery settings={settings} />,
  document.getElementById('gallery-app')
);

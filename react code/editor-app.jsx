var React = require('react');
var Editor = require('./components/Editor.jsx');
var settings = require('../settings');

var params = (function() {
  var params = {};

  var query = window.location.search.replace('?','').split('&');

  query = query.map(function(v) {
    var terms = v.split('=');
    return { name: terms[0], value: terms[1] };
  }).forEach(function(v) {
    params[v.name] = v.value;
  });

  return params;
}());

React.render(
  <Editor settings={settings} params={params} />,
  document.getElementById('editor-app')
);

var React = require('react');
var WebmakerLoginUX = require('./WebmakerLoginUX.jsx');
var MakeGallery = require('./MakeGallery.jsx');

var App = React.createClass({

  getInitialState: function() {
    return {
      locale: navigator.language
    };
  },

  render: function() {
    return (
      <div>
        <WebmakerLoginUX locale={this.state.locale}/>
        <MakeGallery  locale={this.state.locale}/>
      </div>
    );
  },

  setLocale: function(locale) {
    this.setState({
      locale: locale
    });
  }

});

module.exports = App;
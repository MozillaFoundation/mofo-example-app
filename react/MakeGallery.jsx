var React = require('react');
var Make = require('./Make.jsx');
var request = require('request');

var MakeGallery = React.createClass({

  getInitialState: function() {
    return {
      makes: []
    };
  },

  componentDidMount: function() {
    request(window.location.toString() + "api/1.0/findAll", this.handleMakes);
  },

  handleMakes: function(err, data) {
    data = JSON.parse(data.body);
    this.setState({
      makes: data.makes
    });
  },

  render: function() {
    return (
      <div className="make-gallery component">
      {this.buildMakes()}
      </div>
    );
  },

  buildMakes: function() {
    return this.state.makes.map(function(make) {
      return <Make {...make} key={make.id}/>;
    });
  }

});

module.exports = MakeGallery;
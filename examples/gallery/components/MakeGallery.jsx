var React = require("react");
var Make = require("./Make.jsx");
var request = require("superagent");

var MakeGallery = React.createClass({

  getInitialState: function() {
    return {
      makes: []
    };
  },

  componentDidMount: function() {
    request.get(this.props.apiserver + "/api/1.0/findAll")
           .end(this.handleMakes);
  },

  handleMakes: function(err, data) {
    data = JSON.parse(data.text);
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
    var editor = this.props.editor;
    var apiserver = this.props.apiserver;
    return this.state.makes.map(make => {
      return <Make make={make}
                   key={make.id}
                   editor={editor}
                   apiserver={apiserver} />;
    });
  }

});

module.exports = MakeGallery;
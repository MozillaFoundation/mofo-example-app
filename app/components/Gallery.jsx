var React = require("react");
var MakeGrid = require("./MakeGrid.jsx");
var Gallery = React.createClass({

  render: function() {
    return (
      <div>
        <MakeGrid />
      </div>
    );
  }

});

module.exports = Gallery;
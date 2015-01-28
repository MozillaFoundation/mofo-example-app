var React = require("react");
var request = require("superagent");
var Entry = require("./Entry.jsx");

var MakeGrid = React.createClass({

  getInitialState: function() {
    return {
      list: []
    };
  },

  componentDidMount: function() {
    request.get("dummydata.json").end(this.handleData);
  },

  handleData: function(err, data) {
    data = JSON.parse(data.text);
    this.setState({
      list: data.entries
    });
  },

  render: function() {
    return (
      <div className="make-gallery component">
      {this.buildGrid()}
      </div>
    );
  },

  buildGrid: function() {
    var list = this.state.list;
    return list.map(entry => {
      return (
        <Entry data={entry}
               key={entry.id}
               loggedIn={this.props.loggedIn}/>
      );
    });
  }

});

module.exports = MakeGrid;

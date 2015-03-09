var React = require("react");
var analytics = require("webmaker-analytics");

var LabeledField = React.createClass({

  mixins: [
    require("react-onclickoutside")
  ],

  getInitialState: function() {
    return {
      value: this.props.value,
      editing: false
    };
  },

  handleClickOutside: function(evt) {
    if (this.state.editing === false) {
      return;
    }

    this.setState({
      editing: false
    });

    analytics.event("Finish editing label field");
    if (this.props.onUpdate) {
      this.props.onUpdate(this.state.value);
    }
  },

  render: function() {
    var value = this.showValue();
    return (
      <div className="labeled field">
        <span className="label">{this.props.label}</span>
        { value }
      </div>
    );
  },

  showValue: function() {
    if (!this.state.editing) {
      return (
        <span className="value"
              onClick={this.toggle}>{this.state.value}</span>
      );
    }
    return (
      <input type="text"
             value={this.state.value}
             onChange={this.handleUpdate} />
    );
  },

  toggle: function() {
    if (!this.props.editable) {
      return;
    }

    this.setState({
      editing: !this.state.editing
    });
  },

  handleUpdate: function(evt) {
    this.setState({
      value: evt.target.value
    });
  }

});

module.exports = LabeledField;

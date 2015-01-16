var React = require('react');
var I18N = require('../../mixins/I18N');

var LocalePicker = React.createClass({

  mixins: [I18N],

  getInitialState: function() {
    return {
      strings: this.getLocales(),
      locale:  this.getLocale()
    };
  },

  render: function() {
    var strings = this.state.strings;
    var locales = Object.keys(this.state.strings).map(function(localeName) {
      return <option value={localeName} key={localeName}>{strings[localeName]}</option>;
    });
    var props = {
      className: "language-picker component btn btn-default",
      value: this.state.locale,
      onChange: this.changeLocale
    };
    return <select {...props}>{locales}</select>;
  },

  changeLocale: function(evt) {
    var selected = evt.target.value;
    this.triggerLocaleChange(selected);
  }

});

module.exports = LocalePicker;
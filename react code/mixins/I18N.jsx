// this would be a library requirement after we fully implement l10n/i18n
var L10N = {
  setLocale: function(locale) {
    // ...
  },

  localize: function(key) {
    return key.split('').reverse().join('');
  },

  localizeAll: function(map) {
    var mapped = {};
    Object.keys(map).forEach(function(key) {
      mapped[key] = L10N.localize(map[key]);
    });
    return mapped;
  }
};


// this mixing handles localisation of any and all components,
// by binding the localisation to when the component is mounted.
module.exports = {

  localizeDate: function(timestamp) {
    var d = new Date(timestamp);
    return d.toLocaleString();
  },

  // localise all "strings" in a component's state
  componentDidMount: function() {
    // which locale are we in?
    var locale = navigator.language;
    L10N.setLocale(locale);

    // localise! (which right now means: reverse all strings)
    var strings = this.state.strings;
    var localized = L10N.localizeAll(strings);

    // binding the new locale strings will automatically trigger a rerender.
    this.setState({
      locale: locale,
      strings: localized
    });
  }

}
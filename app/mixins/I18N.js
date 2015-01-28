var L10N = require("../lib/L10N");

var LocaleEventName = "locale-change";

// This mixing handles localisation of any and all components,
// by binding the localisation to when the component is mounted.
module.exports = {

  getLocale: function() {
    return L10N.locale;
  },

  getLocales: function() {
    return L10N.locales;
  },

  // Localise all "strings" in a component's state
  componentDidMount: function() {
    // Cache the original strings
    this._stringCache = this.state.strings;

    // Which locale are we in?
    L10N.setLocale(this.state.locale);
    this.updateLocaleStrings(this.state.locale);

    // Make sure to listen for locale change events.
    document.addEventListener(LocaleEventName, this.processLocaleChange);
  },

  componentWillUnmount: function() {
    document.removeEventListener(LocaleEventName, this.processLocaleChange);
  },

  processLocaleChange: function(evt) {
    var locale = evt.detail.locale;
    this.updateLocaleStrings(locale);
  },

  localizeDate: function(timestamp) {
    var d = new Date(timestamp);
    return d.toLocaleString();
  },

  updateLocaleStrings: function(locale) {
    var strings = this._stringCache;
    var localized = L10N.localizeAll(strings);
    this.setState({
      locale: locale,
      strings: localized
    });
  },

  triggerLocaleChange: function(locale) {
    L10N.setLocale(locale);
    var data = { detail: { locale: locale }};
    var evt = new CustomEvent(LocaleEventName, data);
    document.dispatchEvent(evt);
  }

};

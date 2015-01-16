// this would be a library requirement after we fully implement l10n/i18n
var localizers = {};

var defaultLocalizer = function(v) { return v; }
localizers["en-US"] = defaultLocalizer;
localizers["en-US-reverse"] = function(v) { return v.split('').reverse().join(''); };

var L10N = {
  locale: localStorage["mofo-example-app-locale"] || "en-US",

  locales: {
    "en-US": "US English",
    "en-US-reverse": "Mirrorlandish"
  },

  localize: defaultLocalizer,

  setLocale: function(locale) {
    locale = locale || localStorage["mofo-example-app-locale"];
    this.locale = locale;
    this.localize = localizers[locale] || defaultLocalizer;
    localStorage["mofo-example-app-locale"] = locale;
  },

  localizeAll: function(map) {
    var mapped = {};
    Object.keys(map).forEach(function(key) {
      mapped[key] = L10N.localize(map[key]);
    });
    return mapped;
  }
};

var LocaleEventName = "locale-change";

// this mixing handles localisation of any and all components,
// by binding the localisation to when the component is mounted.
module.exports = {

  getLocale: function() {
    return L10N.locale;
  },

  getLocales: function() {
    return L10N.locales;
  },

  // localise all "strings" in a component's state
  componentDidMount: function() {
    // cache the original strings
    this._stringCache = this.state.strings;

    // which locale are we in?
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
    var data = {detail: { locale: locale }};
    var evt = new CustomEvent(LocaleEventName, data);
    document.dispatchEvent(evt);
  }

}
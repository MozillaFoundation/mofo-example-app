/**
 * This is a dummy localization library
 */

var localizers = {};

var defaultLocalizer = function(v) {
  return v;
};

localizers["en-US"] = defaultLocalizer;

localizers["en-US-reverse"] = function(v) {
  return v.split("").reverse().join("");
};

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
    var localize = function(key) {
      mapped[key] = L10N.localize(map[key]);
    };
    Object.keys(map).forEach(localize);
    return mapped;
  }
};

module.exports = L10N;

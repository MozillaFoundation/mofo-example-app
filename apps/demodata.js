/**
 * This is currently stubbed behaviour, while we work out how exactly
 * to tackel server-side applications, including service endpoints.
 */
var adverbs = ["Awesome", "Bestest", "Creative", "Excellent", "Greatest", "Happy", "Lovely", "Major", "Penultimate", "Super", "Totally", "Weird"];
var nouns = ["Aardvark", "Bungalo", "Chainsaw", "Dirk", "Egg", "Foghorn", "Greengrocer", "Lamantine", "Movie", "Noisemaker", "Orpheum", "Penguin", "Ribena", "Skyfall", "Tyrannosaurus", "Ungulate", "Ventilator", "Wheelie", "Xylophone", "Yttrium", "Zoo"];
var names = ["Anne", "Bob", "Carly", "Dylan", "Erik", "George", "Harold", "Isaac", "John", "Karl", "Linus", "Mike", "Nora", "Ophelia", "Petra", "Quintus", "Richard", "Silvia", "Teresa", "Victor", "Walt", "Xena", "Yvan"];
var generate = 50;

var makes = (function() {
  var makes = {};
  for(var i=0, a, n; i<generate; i++) {
    a = adverbs[(Math.random()*adverbs.length) | 0];
    n = nouns[(Math.random()*nouns.length) | 0];

    var id = (""+Math.random()).substring(2) + "-" + (""+Math.random()).substring(2);
    makes[id] = {
      name: a + " " + n,
      author: names[(Math.random()*names.length) | 0],
      likes: (Math.random() * 100) | 0,
      created: Date.now(),
      url: "http://"+a+"."+n+".com",
      id: id
    };
  }
  return makes;
}());

module.exports = makes;

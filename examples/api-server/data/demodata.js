/**
 * This is currently stubbed behaviour, while we work out how exactly
 * to tackel server-side applications, including service endpoints.
 */
var adverbs = [
  "Awesome",
  "Bestest",
  "Creative",
  "Excellent",
  "Greatest",
  "Happy",
  "Lovely",
  "Major",
  "Penultimate",
  "Super",
  "Totally",
  "Weird"
];

var nouns = [
  "Aardvark",
  "Bungalo",
  "Chainsaw",
  "Dirk",
  "Egg",
  "Foghorn",
  "Greengrocer",
  "Lamantine",
  "Movie",
  "Noisemaker",
  "Orpheum",
  "Penguin",
  "Ribena",
  "Skyfall",
  "Tyrannosaurus",
  "Ungulate",
  "Ventilator",
  "Wheelie",
  "Xylophone",
  "Yttrium",
  "Zoo"];

var names = [
  "Anne",
  "Bob",
  "Carly",
  "Dylan",
  "Erik",
  "George",
  "Harold",
  "Isaac",
  "John",
  "Karl",
  "Linus",
  "Mike",
  "Nora",
  "Ophelia",
  "Petra",
  "Quintus",
  "Richard",
  "Silvia",
  "Teresa",
  "Victor",
  "Walt",
  "Xena",
  "Yvan"];

var generate = 50;

var makes = (function() {
  var makes = {};
  for(var i=0, a, n; i<generate; i++) {
    a = adverbs[Math.floor(Math.random()*adverbs.length)];
    n = nouns[Math.floor(Math.random()*nouns.length)];

    var id = (""+Math.random()).substring(2);
    id += "-" + (""+Math.random()).substring(2);

    makes[id] = {
      name: a + " " + n,
      author: names[Math.floor(Math.random()*names.length)],
      likes: Math.floor(Math.random() * 100),
      created: Date.now(),
      url: "http://"+a+"."+n+".com",
      id: id
    };
  }
  return makes;
}());

module.exports = makes;

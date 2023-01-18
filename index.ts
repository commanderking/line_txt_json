const fs = require("fs");

const stringedTextFile = fs.readFileSync("annjeff.txt").toString();

var array = stringedTextFile.split("\n");

console.log(array[2]);
// for (let i in array) {
//   console.log(array[i]);
// }

const regexp = /foo[a-z]*/g;

const date = new RegExp(
  "(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \\d{2}\\/\\d{2}\\/\\d{4}",
  "g"
);

// console.log(stringedTextFile);

const dates = [...stringedTextFile.matchAll(date)];

const indexes = dates.map((date) => date.index);
console.log({ indexes });

const string = stringedTextFile.substring(61, 4644);

// console.log(string);

const stringTwo = stringedTextFile.substring(4644, 8797);

// console.log(stringTwo);

console.log(stringedTextFile);

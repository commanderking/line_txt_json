"use strict";
const fs = require("fs");
const stringedTextFile = fs.readFileSync("data.txt").toString();
var array = stringedTextFile.split("\n");
console.log(array[2]);
// for (let i in array) {
//   console.log(array[i]);
// }
const regexp = /foo[a-z]*/g;
const dateRegex = new RegExp("(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \\d{2}\\/\\d{2}\\/\\d{4}", "g");
const dates = [...stringedTextFile.matchAll(dateRegex)];
const stringLength = stringedTextFile.length;
const stringIndexes = dates.map((date) => date.index);
console.log({ stringIndexes });
const string = stringedTextFile.substring(61, 4644);
// console.log(string);
const stringTwo = stringedTextFile.substring(4644, 8797);
// console.log(stringTwo);
// console.log(stringLength);
const substringStartEndIndexes = stringIndexes.map((stringIndex, index, indexes) => {
    const nextIndex = indexes[index + 1] || stringLength;
    return [stringIndex, nextIndex];
});
console.log(substringStartEndIndexes);
const dailyChats = substringStartEndIndexes.map((startEndIndex) => {
    return stringedTextFile.substring(startEndIndex[0], startEndIndex[1]);
});
console.log(dailyChats[1]);

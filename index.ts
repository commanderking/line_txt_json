const fs = require("fs");

let stringedTextFile: string = fs.readFileSync("data.txt").toString();

const dateRegex = new RegExp(
  "(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \\d{2}\\/\\d{2}\\/\\d{4}",
  "g"
);

const getStartEndIndexesForDates = (stringedTextFile: string) => {
  const dates = [...stringedTextFile.matchAll(dateRegex)];
  const maxIndex = stringedTextFile.length;

  const stringIndexes = dates.map((date) => date.index);
  console.log({ stringIndexes });

  const substringStartEndIndexes = stringIndexes.map(
    (stringIndex, index, indexes) => {
      const nextIndex = indexes[index + 1] || maxIndex;

      return [stringIndex, nextIndex];
    }
  );

  return substringStartEndIndexes;
};

const startEndIndexes = getStartEndIndexesForDates(stringedTextFile);

const dailyChats = startEndIndexes.map((startEndIndex) => {
  return stringedTextFile.substring(startEndIndex[0] || 0, startEndIndex[1]);
});

const formatDailyChat = (dailyChat: string) => {
  console.log(dailyChat);
  const dailyChatByLine = dailyChat
    .split("\r\n")
    // LINE adds blank lines to the end of each day. Filter these out
    .filter((line) => line.length !== 0);

  const dateRegex = new RegExp("\\d{2}\\/\\d{2}\\/\\d{4}", "g");

  const dates = dailyChatByLine[0].match(dateRegex);

  const date = dates ? dates[0] : null;

  if (!date) {
    return null;
  }

  const chatLength = dailyChatByLine.length;

  const formattedDailyChat = dailyChatByLine.slice(1, chatLength);

  const messages = formattedDailyChat.map((message) => {
    const splitMessage = message.split("\t");

    return {
      time: splitMessage[0] || null,
      author: splitMessage[1] || null,
      message: splitMessage[2] || null,
    };
  });

  return {
    date,
    messages,
  };
};

const formattedDailyChats = dailyChats.map(formatDailyChat);

let data = JSON.stringify(formattedDailyChats);
fs.writeFileSync("dailyChats.json", data);

console.log(formatDailyChat(dailyChats[1]));

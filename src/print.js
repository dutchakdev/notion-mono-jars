const colors = {
  blue: "\x1b[36m%s\x1b[0m",
  yellow: "\x1b[33m%s\x1b[0m",
  green: "\x1b[32m%s\x1b[0m",
  red: "\x1b[31m%s\x1b[0m",
};

const emoji = {
  rocket: "🚀",
  success: "🎉",
  progress: "⏳",
  error: "🚨",
  time: "🕒",
};

const prettyPrint = (colorName, emojiName, ...a) => {
  const color = colors[colorName];
  const emojiChar = emoji[emojiName];
  const date = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Singapore",
  });
  console.log(color, `${emojiChar} ${date} `, ...a);
};

module.exports = {
  prettyPrint,
};

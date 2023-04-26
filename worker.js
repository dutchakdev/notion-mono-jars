const { convertCentsToDollars, calculateProgress } = require("./src/utils");
const {
  M_STATUS_ACTIVE,
  M_STATUS_CLOSE,
  N_STATUS_ACTIVE,
  PROPERTY_JAR,
  PROPERTY_STATUS,
} = require("./src/constants");
const {
  queryDatabase,
  updateProgress,
  finishDonation,
} = require("./src/notion");
const { fetchJarInfo, parseJarIdFromUrl } = require("./src/monobank");
const { scheduleTask, validate, CronosExpression } = require("cronosjs");

const update = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const database = await queryDatabase(databaseId);

  // console.log new line
  console.log("\n");

  database.forEach(async (data) => {
    let pageId = data?.id;
    let jarLink = data?.properties[PROPERTY_JAR]?.url;
    if (jarLink === undefined) {
      return;
    }

    let jarId = parseJarIdFromUrl(jarLink);
    let { jarGoal, jarAmount, jarStatus } = await fetchJarInfo(jarId);

    if (jarStatus === M_STATUS_ACTIVE) {
      const progress = calculateProgress(
        convertCentsToDollars(jarAmount),
        convertCentsToDollars(jarGoal)
      );

      await updateProgress(pageId, progress);
      // console.log("pageId: ", pageId, "Progress updated: ", progress);
      console.log(
        "\x1b[36m%s\x1b[0m",
        "pageId: ",
        pageId,
        "Progress updated: ",
        progress,
        "%"
      );
    } else if (
      jarStatus === M_STATUS_CLOSE &&
      data?.properties[PROPERTY_STATUS]?.status?.name === N_STATUS_ACTIVE
    ) {
      console.log(
        "\x1b[32m%s\x1b[0m",
        "🎉 SUCCESS: ",
        jarStatus,
        data?.properties["Status"].status.name
      );
      await finishDonation(pageId);
    } else {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "🚨 ERROR: ",
        jarStatus,
        data?.properties["Status"].status.name
      );
    }
  });
};

console.log(
  "\x1b[36m%s\x1b[0m",
  "🚀 Script started with cron expression: ",
  process.env.CRON_EXPRESSION
);
// Pretty print date time with emoji and colors in forma d/m/y h:m:s
console.log(
  "\x1b[36m%s\x1b[0m",
  "⌚️ Started at: ",
  new Date().toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
  })
);

// update();

scheduleTask(process.env.CRON_EXPRESSION, update);

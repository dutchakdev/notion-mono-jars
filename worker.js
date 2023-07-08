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
const { prettyPrint } = require("./src/print");

const update = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const database = await queryDatabase(databaseId);

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
      prettyPrint(
        "blue",
        "success",
        `pageId: ${pageId} Progress updated: ${progress}%`
      );
    } else if (
      jarStatus === M_STATUS_CLOSE &&
      data?.properties[PROPERTY_STATUS]?.status?.name === N_STATUS_ACTIVE
    ) {
      prettyPrint(
        "green",
        "success",
        `pageId: ${pageId} Status: ${jarStatus} Status: ${data?.properties["Status"].status.name}`
      );
      await finishDonation(pageId);
    } else {
      prettyPrint(
        "red",
        "error",
        `pageId: ${pageId} Status: ${jarStatus} Status: ${data?.properties["Status"].status.name}`
      );
    }
  });
};

prettyPrint(
  "blue",
  "rocket",
  `Script started with cron expression: ${process.env.CRON_EXPRESSION}`
);

if (process?.env?.RUN_SYNC_ON_START === "true") {
  update();
}

scheduleTask(process.env.CRON_EXPRESSION || "*/1 * * * *", update);

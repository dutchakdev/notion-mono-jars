const { Client } = require("@notionhq/client");
const {
  N_STATUS_ACTIVE,
  PROPERTY_PROGRESS,
  PROPERTY_STATUS,
  N_STATUS_CLOSE,
} = require("./constants");

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// function for query the database in Notion
const queryDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: PROPERTY_STATUS,
      status: {
        equals: N_STATUS_ACTIVE,
      },
    },
  });
  return response?.results;
};

const updateProgress = async (pageId, progress) => {
  return await notion.pages.update({
    page_id: pageId,
    properties: {
      [PROPERTY_PROGRESS]: {
        type: "number",
        number: progress,
      },
    },
  });
};

const finishDonation = async (pageId) => {
  return await notion.pages.update({
    page_id: pageId,
    properties: {
      [PROPERTY_STATUS]: {
        status: {
          name: N_STATUS_CLOSE,
        },
      },
      [PROPERTY_PROGRESS]: {
        type: "number",
        number: 100,
      },
    },
  });
};

// Exports: queryDatabase
module.exports = { queryDatabase, updateProgress, finishDonation };

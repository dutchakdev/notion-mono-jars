const notion = require("@notionhq/client");
const express = require("express");
const { queryDatabase } = require("./src/notion");
const app = express();
const port = process.env.PORT || 3001;
const { fetchJarInfo, parseJarIdFromUrl } = require("./src/monobank");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 120 });

// Initialize a new Notion client
const notionClient = new notion.Client({ auth: process.env.NOTION_API_KEY });

app.use(express.json());

// GET route to retrieve filtered database items
app.get("/items", async (req, res, next) => {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;

    // Initialize an empty filter object
    let filterConditions = {};

    // Parse the query parameters into a filter object
    for (const key in req.query) {
      const [propertyName, propertyType] = key.split("__");

      if (propertyName && propertyType) {
        filterConditions[propertyName] = {};
        filterConditions[propertyName][propertyType] = req.query[key];

        // Set status value as an object
        if (propertyName === "Status") {
          filterConditions[propertyName][propertyType] = {
            equals: req.query[key],
          };
        }
      }
    }

    let results;

    // Call the Notion API
    results = await notionClient.databases.query({
      database_id: databaseId,
      filter: {
        and: Object.keys(filterConditions).map((propertyName) => ({
          property: propertyName,
          ...filterConditions[propertyName],
        })),
      },
    });

    // Send the filtered items as a JSON response
    return res.json({ items: results.results });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.get("/jar/:jarId", async (req, res, next) => {
  let { jarId } = req?.params;
  let jar = cache.get(jarId);
  if (jar == undefined) {
    let { jarGoal, jarAmount, jarStatus } = await fetchJarInfo(jarId);
    cache.set(jarId, { jarGoal, jarAmount, jarStatus });

    res.send({ jarGoal, jarAmount, jarStatus });
  } else {
    let { jarGoal, jarAmount, jarStatus } = jar;

    res.send({ jarGoal, jarAmount, jarStatus });
  }
});

app.get("/", async (req, res, next) => {
  res.send({ msg: "putin khuylo" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

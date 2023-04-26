// Define an asynchronous function that takes in a jarId value
const axios = require("axios");

const fetchJarInfo = async (jarId) => {
  if (!jarId) {
    throw new Error("Invalid jarId");
  }

  try {
    const response = await axios.post(
      "https://send.monobank.ua/api/handler",
      {
        c: "hello",
        clientId: `${jarId}`,
        Pc: "BAONdkDk/CnYfT2FlMsWYm5UGAPWGjKcjNxpQR44YJXC2K0RetzOnIQu3WKVLHPH+mSSbTMsB58YQOuVe/Mb23o=",
      },
      {
        headers: {
          accept: "application/json; charset=utf-8; lang=en",
        },
      }
    );

    const data = response.data;

    if (data.hasOwnProperty("errCode")) {
      throw new Error("Invalid jarId");
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

// Define a function that extracts the jarId value from a URL string
const parseJarIdFromUrl = (url) => {
  const matches = url.match(/\/([^/]+)$/);
  if (!matches || !matches[1]) {
    throw new Error("Invalid URL");
  }
  return matches[1].replace(/\s/g, "");
};

// Export both functions for use in other modules
module.exports = { fetchJarInfo, parseJarIdFromUrl };

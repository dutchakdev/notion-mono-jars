const { fetchJarInfo, parseJarIdFromUrl } = require("../src/monobank");

describe("fetchJarInfo", () => {
  it("should return valid JSON object when passed with jarId", async () => {
    const jarId = "2AwsVyDJ6Q";
    const response = await fetchJarInfo(jarId);
    expect(response).toBeDefined();
    expect(typeof response).toBe("object");
    expect(response).toHaveProperty("jarStatus");
  });
  it("should throw an error when an invalid jarId is passed", async () => {
    const jarId = "";
    await expect(fetchJarInfo(jarId)).rejects.toThrowError("Invalid jarId"); // Assuming the API throws an error when passed with invalid jarId
  });
  it("should throw an error when an invalid jarId is passed [2]", async () => {
    const jarId = "efqegwrg";
    await expect(fetchJarInfo(jarId)).rejects.toThrowError("Invalid jarId"); // Assuming the API throws an error when passed with invalid jarId
  });
});

describe("parseJarIdFromUrl", () => {
  it("should extract the jarId value from a valid URL", () => {
    const url = "https://send.monobank.ua/jar/2AwsVyDJ6Q";
    const expected = "2AwsVyDJ6Q";
    const actual = parseJarIdFromUrl(url);
    expect(actual).toEqual(expected);
  });

  it("should remove any white spaces from the extracted jarId value", () => {
    const url = "https://send.monobank.ua/jar/   2AwsVyDJ6Q   ";
    const expected = "2AwsVyDJ6Q";
    const actual = parseJarIdFromUrl(url);
    expect(actual).toEqual(expected);
  });

  it("should throw an error for invalid URLs", () => {
    const url = "https://example.com/";
    expect(() => {
      parseJarIdFromUrl(url);
    }).toThrowError("Invalid URL");
  });
});

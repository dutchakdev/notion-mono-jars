const { calculateProgress, convertCentsToDollars } = require("../src/utils");

describe("calculateProgress", () => {
  it("should throw an error if targetAmount equals 0", () => {
    expect(() => calculateProgress(100, 0)).toThrowError(
      "Target amount cannot be 0."
    );
  });

  it("should return the correct progress percentage", () => {
    expect(calculateProgress(50, 100)).toEqual(50);
    expect(calculateProgress(75, 200)).toEqual(38);
    expect(calculateProgress(30, 50)).toEqual(60);
    expect(calculateProgress(10, 13)).toEqual(77);
  });
});

describe("convertCentsToDollars", () => {
  it("should return the correct amount in dollars", () => {
    expect(convertCentsToDollars(100)).toEqual(1);
    expect(convertCentsToDollars(500)).toEqual(5);
    expect(convertCentsToDollars(1200)).toEqual(12);
    expect(convertCentsToDollars(98765)).toEqual(987.65);
  });
});

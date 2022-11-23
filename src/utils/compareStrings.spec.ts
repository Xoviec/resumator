import { compareStrings } from "./compareStrings";

describe("compareStrings", () => {
  it("should return true when the strings are identical", () => {
    const isEqual = compareStrings("test", "test");
    expect(isEqual).toBe(true);

    const trimmedisEqual = compareStrings(" test  ", "test ");
    expect(trimmedisEqual).toBe(true);

    const isNotEqual = compareStrings("test", "test2");
    expect(isNotEqual).toBe(false);
  });
});

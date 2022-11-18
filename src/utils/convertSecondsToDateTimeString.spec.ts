import { convertSecondsToDateTimeString } from "./convertSecondsToDateTimeString";

describe("convertSecondsToDateTimeString", () => {
  it("it returns the correct value", () => {
    const dateTime = convertSecondsToDateTimeString(1000);
    expect(dateTime).toBe("01-01-1970 @ 00:00");
  });
});

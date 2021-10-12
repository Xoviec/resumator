import { formatTimespan } from "../date";

describe("expect formatTimeSpan() to return the correct string", () => {
  test("when only startDate is specified", () => {
    const startDate = new Date("01-01-2021");
    expect(formatTimespan({ startDate })).toBe("01-01-2021 - present");
  });

  test("when only endDate is specified", () => {
    const endDate = new Date("08-31-2021");
    expect(formatTimespan({ endDate })).toBe("somewhere in the past - 31-08-2021");
  });

  test("when both startDate and endDate are specified", () => {
    const startDate = new Date("01-01-2021");
    const endDate = new Date("08-31-2021");
    expect(formatTimespan({ startDate, endDate })).toBe("01-01-2021 - 31-08-2021");
  });

  test("when neither startDate and endDate are specified", () => {
    expect(formatTimespan({})).toBe("");
  });

  test("when only endDate is specified with showEndYear", () => {
    const endDate = new Date("08-31-2021");
    expect(formatTimespan({ endDate, showEndYear: true })).toBe("Ended in 2021");
  });

  test("when only startDate is specified with a custom date format", () => {
    const startDate = new Date("01-01-2021");
    const dateFormat = "dd MMMM yyyy";
    expect(formatTimespan({ startDate, dateFormat })).toBe(
      "01 January 2021 - present"
    );
  });

  test("when only endDate is specified with a custom date format", () => {
    const endDate = new Date("08-31-2021");
    const dateFormat = "dd MMMM yyyy";
    expect(formatTimespan({ endDate, dateFormat })).toBe(
      "somewhere in the past - 31 August 2021"
    );
  });

  test("when both startDate and endDate are specified with a custom date format", () => {
    const startDate = new Date("01-01-2021");
    const endDate = new Date("08-31-2021");
    const dateFormat = "dd MMMM yyyy";
    expect(formatTimespan({ startDate, endDate, dateFormat })).toBe(
      "01 January 2021 - 31 August 2021"
    );
  });
});

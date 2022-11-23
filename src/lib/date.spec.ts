import { yearsAndMonthString } from "./date";

describe("Date", () => {
  describe("yearsAndMonthString", () => {
    it("should return only months when there is less than 12 months", () => {
      const result = yearsAndMonthString(4);
      expect(result).toEqual("4 months");
    });
    it("should return only years when there is exactly than 12 months", () => {
      const result = yearsAndMonthString(24);
      expect(result).toEqual("2 years");
    });
    it("should return only years and months", () => {
      const result = yearsAndMonthString(30);
      expect(result).toEqual("2 years and 6 months");
    });
    it("should return only exactly 1 year", () => {
      const result = yearsAndMonthString(12);
      expect(result).toEqual("1 year");
    });
    it("should return only exactly 1 year and 1 month", () => {
      const result = yearsAndMonthString(13);
      expect(result).toEqual("1 year and 1 month");
    });
  });
});

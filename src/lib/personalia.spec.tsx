import { normalizeString } from "./personalia";

describe("personalia", () => {
  describe("normalizeString", () => {
    it("should return a normalized string", () => {
      const result = normalizeString("Hê-mån");
      expect(result).toEqual("He-man");
    });
  });
});

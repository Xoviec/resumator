import { isValidUrl, getDomain } from "../url";

describe("expect isValidUrl() to", () => {
  test("return true when url is valid", () => {
    const validUrls: string[] = [
      "http://linkedin.com",
      "http://linkedin.com/user",
      "http://linkedin.com/user?param=1",

      "https://linkedin.com",
      "https://linkedin.com/user",
      "https://linkedin.com/user?param=1",

      "linkedin.com",
      "linkedin.com/user",
      "linkedin.com/user?param=1",

      "www.linkedin.com",
      "www.linkedin.com/user",
      "www.linkedin.com/user?param=1",

      "subdomain.linkedin.com",
      "subdomain.linkedin.com/user",
      "subdomain.linkedin.com/user?param=1",
    ];

    validUrls.forEach((url) => {
      expect(isValidUrl(url)).toBe(true);
    });
  });

  test("return false when url is invalid", () => {
    const invalidUrls = [
      "http://linkedin",
      "http://linkedin.x",
      "http://linkedin .com/user?param=1",

      "httpx://linkedin",
      "http:/linkedin.com",
      "http//linkedin.com",

      "httpx://linkedin",
      "http:/linkedin.com",
      "linkedin",
    ];

    invalidUrls.forEach((url) => {
      expect(isValidUrl(url)).toBe(false);
    });
  });
});

test("expect getDomain() to return the correct domain", () => {
  const urls = [
    "http://linkedin.com",
    "http://linkedin.com/user",
    "http://linkedin.com/user?param=1",

    "https://linkedin.com",
    "https://linkedin.com/user",
    "https://linkedin.com/user?param=1",

    "linkedin.com",
    "linkedin.com/user",
    "linkedin.com/user?param=1",

    "www.linkedin.com",
    "www.linkedin.com/user",
    "www.linkedin.com/user?param=1",

    "subdomain.linkedin.com",
    "subdomain.linkedin.com/user",
    "subdomain.linkedin.com/user?param=1",
  ];

  urls.forEach((url) => {
    expect(getDomain(url)).toBe("linkedin.com");
  });
});

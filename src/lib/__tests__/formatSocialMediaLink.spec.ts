import { formatSocialMediaLink } from "../formatSocialMediaLink";
import { SocialLinkModel } from "../../components/LivePreviewerComponents/SocialLinks";

describe("expect formatSocialMediaLink to return the correct userName", () => {
  test("when linkType is linkedin", () => {
    const socialLink: SocialLinkModel = {
      link: "https://www.linkedin.com/in/johndoe",
      linkType: "linkedin",
      title: null,
    };
    expect(formatSocialMediaLink(socialLink)).toEqual({
      link: "https://www.linkedin.com/in/johndoe",
      userName: "johndoe",
    });
  });

  test("when linkType is github", () => {
    const socialLink: SocialLinkModel = {
      link: "https://github.com/johndoe",
      linkType: "github",
      title: null,
    };
    expect(formatSocialMediaLink(socialLink)).toEqual({
      link: "https://github.com/johndoe",
      userName: "johndoe",
    });
  });

  test("when linkType is twitter", () => {
    const socialLink: SocialLinkModel = {
      link: "https://twitter.com/johndoe",
      linkType: "twitter",
      title: null,
    };
    expect(formatSocialMediaLink(socialLink)).toEqual({
      link: "https://twitter.com/johndoe",
      userName: "johndoe",
    });
  });

  test("when linkType is not linkedin, github, or twitter", () => {
    const socialLink: SocialLinkModel = {
      link: "https://www.google.com",
      linkType: "google",
      title: null,
    };
    expect(formatSocialMediaLink(socialLink)).toEqual({
      link: "https://www.google.com",
      userName: "https://www.google.com",
    });
  });
});

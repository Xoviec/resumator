import { SocialLinkModel } from "../components/LivePreviewerComponents/SocialLinks";

export const formatSocialMediaLink = (socialLink: SocialLinkModel) => {
  switch (socialLink.linkType) {
    case "linkedin":
      return {
        link: `${socialLink.link}`,
        userName: socialLink.link.split("https://www.linkedin.com/in/")[1],
      };
    case "github":
      return {
        link: `${socialLink.link}`,
        userName: socialLink.link.split("https://github.com/")[1],
      };
    case "twitter":
      return {
        link: `${socialLink.link}`,
        userName: socialLink.link.split("https://twitter.com/")[1],
      };
    default:
      return {
        link: `${socialLink.link}`,
        userName: `${socialLink.link}`,
      };
  }
};

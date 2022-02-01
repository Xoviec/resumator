import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent } from "react";
import { formatSocialMediaLink } from "../../lib/formatSocialMediaLink";
import {
  SocialLinkModel,
  SocialLinkTypeToInfoMapping,
  SocialLinkType,
} from "../LivePreviewerComponents/SocialLinks";

const Root = styled.View`
  background-color: #e0e0e0;
  padding: 10px;
  width: 350px;
  margin: 0 10px;
`;

const Header = styled.Text`
  color: #ff450d;
  font-size: 8px;
  margin-bottom: 2px;
`;

const SocialLinkWrapper = styled.View`
  display: flex;
  margin: 6px 0;
`;

const SocialLinkTitle = styled.Text`
  font-family: "Stratum";
  font-size: 8px;
  font-weight: 400;
`;

const SocialLinkUrl = styled.Link`
  font-family: "Helvetica";
  font-size: 8px;
  font-weight: 100;
`;

interface PDFSocialLinks {
  socialLinks: SocialLinkModel[];
}

export const PDFSocialLinks: VoidFunctionComponent<PDFSocialLinks> = ({
  socialLinks,
}) => {
  if (!socialLinks || !socialLinks.length) {
    return null;
  }

  return (
    <Root>
      <Header>ONLINE PRESENCE</Header>
      {socialLinks.map((socialLink, index) => {
        const socialLinkItemInfo = SocialLinkTypeToInfoMapping[socialLink.linkType];
        return (
          <SocialLinkWrapper key={index}>
            <SocialLinkTitle>
              {socialLink.linkType === SocialLinkType.Other
                ? socialLink.title
                : socialLinkItemInfo.title}
            </SocialLinkTitle>

            <SocialLinkUrl>{formatSocialMediaLink(socialLink).link}</SocialLinkUrl>
          </SocialLinkWrapper>
        );
      })}
    </Root>
  );
};

import { View, Text, Image, Link, StyleSheet } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent } from "react";
import LogoWhite from "../../assets/images/iO-logo-white.png";
import { calculateAge, getCountry } from "../../lib";
import { formatSocialMediaLink } from "../../lib/formatSocialMediaLink";
import {
  SocialLinkModel,
  SocialLinkTypeToInfoMapping,
} from "../LivePreviewerComponents/SocialLinks";
import { PersonaliaModel } from "../LivePreviewerComponents/TopSection";

const Root = styled(View)`
  font-family: "Reckless";
  font-style: italic;
  font-width: normal;
  width: 100%;
  background-color: #873170;
  height: 360px;
  padding: 26px 0 0 35px;
  color: white;
  margin-bottom: 86px;
`;

const Logo = styled(Image)`
  position: absolute;
  top: 0;
  right: 36px;
  width: 71px;
  height: 71px;
  margin-left: -7px;
`;

const Heading = styled(Text)`
  font-family: "TTCommonsPro";
  font-style: normal;
  font-size: 50px;
  margin-top: 10px;
`;

const PersonalInfoText = styled(View)`
  max-width: 262px;
  margin-top: 18px;
`;

const SubHeading = styled(Text)`
  font-size: 25px;
`;

const PersonalInfoBio = styled(Text)`
  font-family: "TTCommonsPro";
  font-style: normal;
  font-size: 9px;
  line-height: 1.7;
  white-space: pre-wrap;
`;

const PersonalInfoBox = styled(View)`
  position: absolute;
  width: 221px;
  height: 212px;
  padding: 21px 0 0 24px;
  background: #f5b3cc;
  top: 186px;
  right: 36px;
  color: #000;
  font-size: 10px;
`;

export const PDFHeader: VoidFunctionComponent<{
  personalia: PersonaliaModel;
  introduction: string | undefined;
  socialLinks: SocialLinkModel[];
}> = ({
  personalia: { firstName, city, dateOfBirth, lastName, email, role, countryCode },
  introduction,
  socialLinks,
}) => {
  const age = dateOfBirth ? calculateAge(dateOfBirth) : "";
  city = city ? city : "";

  const styles = StyleSheet.create({
    row: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      alignItems: "center",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "space-around",
      height: "75px",
    },
    socialsIcons: {
      width: "13px",
      height: "13px",
      marginBottom: "9px",
      marginRight: "9px",
    },
    my_5: {
      margin: "5px 0",
    },
    mt_8: {
      marginTop: "8px",
    },
    mt_15: {
      marginTop: "15px",
    },
  });
  return (
    <Root>
      <Logo src={LogoWhite} />
      <View>
        <Heading>
          {firstName} {lastName}
        </Heading>
      </View>
      <SubHeading>{role}</SubHeading>

      <PersonalInfoText>
        <PersonalInfoBio>{introduction}</PersonalInfoBio>
      </PersonalInfoText>

      <PersonalInfoBox>
        <View>
          <Text style={styles.my_5}>
            {city.toUpperCase()} REGION - {getCountry(countryCode).code}
          </Text>
          <Text>{age ? `${age} years old` : ""}</Text>
        </View>
        <View style={[styles.mt_15, styles.column]}>
          {socialLinks.map((socialLink, index) => {
            const socialLinkItem = SocialLinkTypeToInfoMapping[socialLink.linkType];
            return (
              <View key={socialLink.linkType + index} style={styles.row}>
                <Image src={socialLinkItem.image} style={styles.socialsIcons} />
                <Link
                  style={{ textDecoration: "none" }}
                  src={formatSocialMediaLink(socialLink).link}
                >
                  {formatSocialMediaLink(socialLink).userName}
                </Link>
              </View>
            );
          })}
        </View>
      </PersonalInfoBox>
    </Root>
  );
};

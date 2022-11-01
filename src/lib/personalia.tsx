import { IconFlagNL, IconFlagBE } from "../components/Icons";
import {
  CountryCode,
  PersonaliaModel,
} from "../components/LivePreviewerComponents/TopSection";

interface CountryInfo {
  code: keyof typeof CountryCode;
  title: string;
}

export const CountryMapping: Record<CountryCode, CountryInfo> = {
  NL: {
    code: "NL",
    title: "The Netherlands",
  },
  BE: {
    code: "BE",
    title: "Belgium",
  },
};

export const getCountry = (
  countryCode: keyof typeof CountryCode = CountryCode.NL
) => {
  return CountryMapping[countryCode];
};

export const getCountryIcon = (countryCode: PersonaliaModel["countryCode"]) => {
  if (countryCode === CountryCode.BE) return <IconFlagBE />;
  return <IconFlagNL />;
};

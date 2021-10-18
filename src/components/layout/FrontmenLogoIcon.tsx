import { SvgIcon, SvgIconProps } from "@mui/material";
import { VoidFunctionComponent } from "react";

export const FrontmenLogoIcon: VoidFunctionComponent<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 96 96" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(7, 0)">
        <path fill="#FF5900" d="M43 46.04v14.694l26-14.693V96l13-7.347V24z" />
        <path
          fill="#0CC"
          d="M40.5 0L5 20.633 17.679 28 40.5 14.737 63.322 28 76 20.633z"
        />
        <path
          fill="#FFF"
          d="M0 88.653L13 96V72.493L31.2 82.78V68.085L13 57.8V46.004l26 14.731V46.041L0 24z"
        />
      </g>
    </SvgIcon>
  );
};

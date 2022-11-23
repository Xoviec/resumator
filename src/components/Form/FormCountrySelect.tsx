import { Box, MenuItem } from "@mui/material";
import { VFC } from "react";
import { CountryMapping, getCountryIcon } from "../../lib";
import { FormSelect } from "../Form/FormSelect";

interface Props {
  name: string;
}

export const FormCountrySelect: VFC<Props> = ({ name }) => {
  return (
    <FormSelect
      size="small"
      required
      defaultValue={CountryMapping.NL.code}
      name={name}
      label="Country"
    >
      {Object.entries(CountryMapping).map(([key, info]) => {
        return (
          <MenuItem key={key} value={key}>
            <Box display="flex" flexDirection="row" gap="10px" alignItems="center">
              <Box display="flex" alignItems="center" style={{ width: "16px" }}>
                {getCountryIcon(info.code)}
              </Box>
              {info.title}
            </Box>
          </MenuItem>
        );
      })}
    </FormSelect>
  );
};

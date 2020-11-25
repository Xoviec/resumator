import React, { FunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControlProps, makeStyles } from "@material-ui/core";
import { colors } from "../../config/theme";
import FormSkillsSelectAutocomplete from "./FormSkillsSelectAutocomplete";

interface FormSkillsSelectProps extends FormControlProps {
  name: string;
  label?: string;
}

const useStyles = makeStyles({
  avatar: {
    width: "100px",
    height: "200px",
    margin: "16px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    cursor: "pointer",

    "&:hover": {
      outline: `2px auto ${colors.darkBlue}`,
    }
  },
  selected: {
    outline: `2px auto ${colors.orange}`,
  }
});

export const FormSkillsSelect: FunctionComponent<FormSkillsSelectProps> = ({ name, label, ...props }) => {
  const classes = useStyles();
  const { control } = useFormContext();

  return (
    <Controller
      defaultValue={[]}
      control={control}
      name={name!}
      render={({ value, onChange }) => (
        <FormSkillsSelectAutocomplete
          {...props}
          label={label}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};
import React from "react";
import { Controller } from "react-hook-form";
import SkillsSelect from "./SkillsSelect";

const SkillsSelectFormField = ({
  skills,
  onSkillsChanged,
  label,
  formControl,
  formRules,
  name,
}) => {
  return (
    <Controller
      as={(props) => <SkillsSelect {...props} label={label} />}
      control={formControl}
      rules={formRules}
      name={name}
      onChange={([value]) => {
        onSkillsChanged(value);

        return value;
      }}
      defaultValue={skills}
    />
  );
};

export default SkillsSelectFormField;

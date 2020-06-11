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
  const onChange = ([value]) => {
    onSkillsChanged(value);

    return value;
  };

  return (
    <Controller
      as={SkillsSelect}
      control={formControl}
      rules={formRules}
      name={name}
      onChange={onChange}
      defaultValue={skills}
      label={label}
    />
  );
};

export default SkillsSelectFormField;

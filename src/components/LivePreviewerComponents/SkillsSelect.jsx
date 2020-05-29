import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CustomChip from "./CustomChip";
import { skillsConstants } from "../../config/skills.constants";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

export const createSkillObjects = (skillStrings) => {
  return skillStrings.map((s) => ({ name: s }));
};

const SkillsSelect = ({ skills, setSkills, label }) => {
  const handleChange = (e) => {
    setSkills(e.target.value);
  };

  const handleDelete = (skillName) => {
    const newSkills = skills.filter((s) => s !== skillName);
    setSkills(newSkills);
  };
  return (
    <FormControl>
      {label && <InputLabel id="skill-label">{label}</InputLabel>}

      <Select
        labelId="skill-label"
        id="skill"
        multiple
        value={skills}
        onChange={handleChange}
        renderValue={(selectedSkills) => {
          return (
            <>
              {selectedSkills.map((skill) => (
                <CustomChip
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  key={skill}
                  label={skill}
                  onDelete={() => handleDelete(skill)}
                />
              ))}
            </>
          );
        }}
      >
        {skillsConstants.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SkillsSelect;

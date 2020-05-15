import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import angularBadge from "../../assets/images/angularBadge.png";
import nodeBadge from "../../assets/images/nodeBadge.png";
import cssBadge from "../../assets/images/cssBadge.png";
import { Flex } from "rebass";
import Card from "../Card";
import { useForm } from "react-hook-form";
import EditModalWrapper from "./ModalWrapper";
import EditIcon from "./EditIcon";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Input from "../Input";
import { skillsConstants } from "../../config/skills.constants";

const Skills = ({ skills, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm({});

  useEffect(() => {
    methods.reset({});
  }, [skills]);

  const reset = () => {
    methods.reset({});
  };
  return (
    <StyledCard>
      <Title>Skills</Title>
      <EditIcon
        className="add-new-button"
        onClick={() => setIsEditing((prevState) => !prevState)}
        icon={faPlus}
      />
      <Flex alignItems="center" justifyContent="space-around">
        <Badge src={angularBadge} />
        <Badge src={nodeBadge} />
        <Badge src={cssBadge} />
      </Flex>
      <Subtitle>Languages - frameworks - libraries</Subtitle>
      <ul>
        {skills.map((s) => (
          <li key={s.name}>{s.name}</li>
        ))}
      </ul>

      <EditModalWrapper
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        methods={methods}
        contentLabel="Edit skills"
        heading="New skill"
        onPrimaryActionClicked={() => {
          onSubmit("skills", [...skills, { name: methods.getValues().skill }]);
          setIsEditing(false);
        }}
        onSecondaryActionClicked={() => {
          reset();
          setIsEditing(false);
        }}
      >
        <Autocomplete
          id="skill"
          options={skillsConstants}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(data, newValue) => {
            methods.setValue("skill", newValue);
          }}
          renderInput={(params) => (
            <Input
              {...params}
              as={TextField}
              name="skill"
              label="New skill"
              control={methods.control}
            />
          )}
        />
      </EditModalWrapper>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  &:hover {
    .add-new-button {
      visibility: visible;
    }
  }
`;

const Badge = styled.img`
  max-width: 100px;
`;

const Title = styled.h2`
  margin: 0 0 16px;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
`;

export default Skills;

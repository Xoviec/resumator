import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import angularBadge from "../../assets/images/angularBadge.png";
import nodeBadge from "../../assets/images/nodeBadge.png";
import cssBadge from "../../assets/images/cssBadge.png";
import { Button, Flex } from "rebass";
import Card from "../Card";
import { useForm } from "react-hook-form";
import { FormField } from "../FormComponents";
import EditModalWrapper from "./ModalWrapper";
import { Input } from "@rebass/forms";
import EditIcon from "./EditIcon";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Skills = ({ skills, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm({
    defaultValues: { skills },
  });

  const register = methods.register;

  useEffect(() => {
    methods.reset({ skills });
  }, [skills]);

  const reset = () => {
    methods.reset({ skills });
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
        heading="Skills"
      >
        <FormField name="skill">
          <Input name="skill" ref={register()} />
        </FormField>
        <Flex justifyContent="flex-end">
          <Button
            onClick={() => {
              reset();
              setIsEditing(false);
            }}
            mr={4}
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit("skills", [...skills, { name: methods.getValues().skill }]);
              setIsEditing(false);
            }}
            variant="primary"
            type="button"
          >
            Save
          </Button>
        </Flex>
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
  width: 22%;
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

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { TextField, Typography } from "@material-ui/core";
import isEqual from "lodash/isEqual";
import Card from "../Card";
import Input from "../Input";
import ActionIcon from "./ActionIcon";
import EditModalWrapper from "./ModalWrapper";

const Introduction = ({ introduction, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm({
    defaultValues: { introduction },
  });

  const reset = methods.reset;
  const getValues = methods.getValues;

  useEffect(() => {
    if (!isEqual(introduction, getValues())) {
      reset({ introduction });
    }
  }, [introduction, getValues, reset]);

  return (
    <DescriptionContainer>
      <TopWrapper>
        <Typography gutterBottom variant="h4">
          Introduction
        </Typography>

        <ActionIcon
          onClick={() => setIsEditing((prevState) => !prevState)}
          isEditing={isEditing}
          icon={faPen}
          tooltipText="Edit introduction"
        />
      </TopWrapper>

      <Typography variant="body1" color={introduction ? "primary" : "secondary"}>
        {introduction
          ? introduction
          : "Click on the pen icon to edit the introduction"}
      </Typography>

      <EditModalWrapper
        heading="Introduction text"
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        methods={methods}
        contentLabel="Edit introduction"
        onPrimaryActionClicked={() => {
          onSubmit("introduction", methods.getValues().introduction);
          setIsEditing(false);
        }}
        onSecondaryActionClicked={() => {
          reset();
          setIsEditing(false);
        }}
      >
        <Input
          as={TextField}
          type="text-area"
          name="introduction"
          label="Introduction"
          multiline
          rows={4}
          control={methods.control}
          defaultValue=""
        />
      </EditModalWrapper>
    </DescriptionContainer>
  );
};

const DescriptionContainer = styled(Card)`
  font-size: 14px;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Introduction;

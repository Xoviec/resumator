import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import Card from "../Card";
import EditIcon from "./EditIcon";
import EditModalWrapper from "./ModalWrapper";
import { TextField } from "@material-ui/core";
import Input from "../Input";
import isEqual from "lodash/isEqual";

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
      <p>{introduction}</p>
      <EditIcon
        className="edit-button"
        onClick={() => setIsEditing((prevState) => !prevState)}
        isEditing={isEditing}
      />

      <EditModalWrapper
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
  max-height: 200px;
  &:hover {
    .edit-button {
      visibility: visible;
    }
  }
`;
export default Introduction;

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import Card from "../Card";
import EditIcon from "./EditIcon";
import { Flex } from "rebass";
import EditModalWrapper from "./ModalWrapper";
import { Button, TextField } from "@material-ui/core";
import Input from "../Input";

const Introduction = ({ introduction, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm({
    defaultValues: { introduction },
  });

  useEffect(() => {
    methods.reset({ introduction });
  }, [introduction]);

  const reset = () => {
    methods.reset({ introduction });
  };

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

        <Flex justifyContent="flex-end">
          <Button
            onClick={() => {
              reset();
              setIsEditing(false);
            }}
            variant="contained"
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit("introduction", methods.getValues().introduction);
              setIsEditing(false);
            }}
            variant="contained"
            type="button"
          >
            Save
          </Button>
        </Flex>
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

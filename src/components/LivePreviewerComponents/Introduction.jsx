import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { Textarea } from "@rebass/forms";
import Card from "../Card";
import EditIcon from "./EditIcon";
import { Button, Flex } from "rebass";
import { FormField } from "../FormComponents";
import EditModalWrapper from "./ModalWrapper";

const Introduction = ({ introduction, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm({
    defaultValues: { introduction },
  });

  const register = methods.register;

  useEffect(() => {
    methods.reset({ introduction });
  }, [introduction, methods]);

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
        heading="introduction"
      >
        <FormField name="introduction">
          <StyledTextArea name="introduction" ref={register()} />
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
              onSubmit("introduction", methods.getValues().introduction);
              setIsEditing(false);
            }}
            variant="primary"
            type="button"
          >
            Save
          </Button>
        </Flex>
      </EditModalWrapper>
    </DescriptionContainer>
  );
};

const StyledTextArea = styled(Textarea)`
  height: 280px;
`;

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

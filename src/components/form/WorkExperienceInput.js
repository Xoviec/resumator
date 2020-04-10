import React from "react";
import { useFieldArray } from "react-hook-form";
import { Box, Button, Flex, Heading } from "rebass";
import { Input, Textarea } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import MoveControls from "./MoveControls";
import { InputWrapper, StyledLabel } from "./styledComponents";

const WorkExperienceInput = ({ name, addButtonLabel, control, register }) => {
  const { fields, prepend, remove, swap } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      <Button onClick={() => prepend({})} variant="outline" color="white">
        <Icon icon={faPlus} size="sm" /> {addButtonLabel}
      </Button>

      {fields.map((item, index) => (
        <div key={item.id}>
          <Flex alignItems="center" justifyContent="space-between">
            <Box width={1} mr={1}>
              <Heading fontSize={20} as="legend" color="white" my="2rem">
                Work Experience #{index + 1}
              </Heading>
            </Box>

            <Box width={1 / 3}>
              <MoveControls
                index={index}
                fields={fields}
                remove={remove}
                swap={swap}
              />
            </Box>
          </Flex>

          <InputWrapper>
            <StyledLabel htmlFor={`${name}[${index}.company]`}>Company</StyledLabel>
            <Input name={`${name}[${index}].company`} ref={register()} />
          </InputWrapper>

          <InputWrapper>
            <StyledLabel htmlFor={`${name}[${index}.role]`}>Role</StyledLabel>
            <Input name={`${name}[${index}].role`} ref={register()} />
          </InputWrapper>

          <InputWrapper>
            <StyledLabel htmlFor={`${name}[${index}.from]`}>Start date</StyledLabel>
            <Input type="date" name={`${name}[${index}].from`} ref={register()} />
          </InputWrapper>

          <InputWrapper>
            <StyledLabel htmlFor={`${name}[${index}.untill]`}>End date</StyledLabel>
            <Input type="date" name={`${name}[${index}].untill`} ref={register()} />
          </InputWrapper>

          <InputWrapper>
            <StyledLabel htmlFor={`${name}[${index}.description]`}>
              Description
            </StyledLabel>
            <Textarea name={`${name}[${index}].description`} ref={register()} />
          </InputWrapper>

          {/* TODO: fieldsInput for stack & techniques */}
        </div>
      ))}
    </>
  );
};

export default WorkExperienceInput;

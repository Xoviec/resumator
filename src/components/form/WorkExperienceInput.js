import React from "react";
import { useFieldArray } from "react-hook-form";
import { Box, Button, Flex, Heading } from "rebass";
import { Input, Textarea } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import FieldsInput from "./FieldsInput";
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
        <Box key={item.id} mb="1rem">
          <Flex direction="row" alignItems="center" justifyContent="space-between">
            <Box width="100%" mr={1}>
              <Heading fontSize={20} as="legend" color="white" my="2rem">
                Work Experience #{index + 1}
              </Heading>
            </Box>

            <Box flexShrink={0}>
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

          <InputWrapper>
            <StyledLabel htmlFor={`${name}[${index}].stackAndTechniques`}>
              Stack and techniques
            </StyledLabel>

            <FieldsInput
              name={`${name}[${index}].stackAndTechniques`}
              addButtonLabel="Add stack / technique"
              control={control}
              register={register}
            />
          </InputWrapper>
        </Box>
      ))}
    </>
  );
};

export default WorkExperienceInput;

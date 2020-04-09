import React from "react";
import { useFieldArray } from "react-hook-form";
import { Box, Button, Flex, Heading } from "rebass";
import { Checkbox, Input } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MoveControls from "./MoveControls";
import { InputWrapper, StyledLabel } from "./styledComponents";

const EducationInput = ({ name, addButtonLabel, control, register }) => {
  const { fields, prepend, remove, swap } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      {fields.map((item, index) => (
        <Box key={item.id} mb="1rem">
          <Flex alignItems="flex-start" justifyContent="space-between">
            <Box width={1} mr={1}>
              <Heading fontSize={20} as="legend" color="white">
                Education #{index + 1}
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
            <StyledLabel htmlFor={`${name}[${index}.institute]`}>
              Institute
            </StyledLabel>
            <Input name={`${name}[${index}].institute`} ref={register()} />
          </InputWrapper>

          <InputWrapper>
            <StyledLabel htmlFor={`${name}[${index}.name]`}>Name</StyledLabel>
            <Input name={`${name}[${index}].name`} ref={register()} />
          </InputWrapper>

          <InputWrapper>
            <StyledLabel htmlFor={`${name}[${index}.level]`}>Level</StyledLabel>
            <Input name={`${name}[${index}].level`} ref={register()} />
          </InputWrapper>

          <InputWrapper>
            <StyledLabel htmlFor={`${name}[${index}.startDate]`}>
              Start date
            </StyledLabel>

            <Input
              type="date"
              name={`${name}[${index}].startDate`}
              ref={register()}
            />
          </InputWrapper>

          <InputWrapper>
            <StyledLabel htmlFor={`${name}[${index}.endDate]`}>End date</StyledLabel>
            <Input type="date" name={`${name}[${index}].endDate`} ref={register()} />
          </InputWrapper>

          <InputWrapper>
            <StyledLabel>
              <Checkbox
                as="input"
                type="checkbox"
                name={`${name}[${index}].certificate`}
                ref={register()}
              />
              Certificate
            </StyledLabel>
          </InputWrapper>
        </Box>
      ))}

      <Button onClick={() => prepend({})} variant="outline" color="white">
        <Icon icon={faPlus} size="sm" /> {addButtonLabel}
      </Button>
    </>
  );
};

export default EducationInput;

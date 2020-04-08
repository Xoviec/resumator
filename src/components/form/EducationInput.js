import styled from "@emotion/styled";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { Box, Button, Flex, Heading } from "rebass";
import { Checkbox, Label, Input } from "@rebass/forms";

import MoveControls from "./MoveControls";

const EducationInput = ({ name, addButtonLabel, control, register }) => {
  const { fields, prepend, remove, swap } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Flex alignItems="center" justifyContent="space-between">
            <Box width={1} mr={1}>
              <Heading fontSize={20} as="legend" color="white" my="2rem">
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
            <StyledLabel htmlFor={`education[${index}.endDate]`}>
              End date
            </StyledLabel>
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
        </div>
      ))}

      <Button onClick={() => prepend({})} variant="outline" color="white">
        {addButtonLabel}
      </Button>
    </>
  );
};

// FIXME: duplicate component (see: PdfCreator.jsx)
const InputWrapper = styled.div`
  margin-top: 1rem;
`;

// FIXME: duplicate component (see: PdfCreator.jsx)
const StyledLabel = styled(Label)`
  margin-bottom: 0.25rem;
`;

export default EducationInput;

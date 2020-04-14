import React from "react";
import { useFieldArray } from "react-hook-form";
import { Box, Button, Flex, Heading } from "rebass";
import { Checkbox, Input } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import FormField from "./FormField";
import MoveControls from "./MoveControls";
import { InputWrapper, StyledLabel } from "./styledComponents";

const EducationInput = ({ name, addButtonLabel, control, register, errors }) => {
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
                Education #{index + 1}
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

          <FormField
            htmlFor={`${name}[${index}.institute]`}
            label="Institute"
            errors={errors}
          >
            <Input name={`${name}[${index}].institute`} ref={register()} />
          </FormField>

          <FormField name={`${name}[${index}.name]`} label="Name" errors={errors}>
            <Input name={`${name}[${index}].name`} ref={register()} />
          </FormField>

          <FormField name={`${name}[${index}.level]`} label="Level" errors={errors}>
            <Input name={`${name}[${index}].level`} ref={register()} />
          </FormField>

          <FormField
            name={`${name}[${index}.startDate]`}
            label="Start date"
            errors={errors}
          >
            <Input
              type="date"
              name={`${name}[${index}].startDate`}
              ref={register()}
            />
          </FormField>

          <FormField
            name={`${name}[${index}.endDate]`}
            label="End date"
            errors={errors}
          >
            <Input type="date" name={`${name}[${index}].endDate`} ref={register()} />
          </FormField>

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
    </>
  );
};

export default EducationInput;

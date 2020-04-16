import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, Button, Flex, Heading } from "rebass";
import { Input, Textarea } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { FieldsInput, FormField, MoveControls } from "../FormComponents";

const ExperienceInput = ({ name, label, addButtonLabel, min }) => {
  const { control, register } = useFormContext();
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
                {label} #{index + 1}
              </Heading>
            </Box>

            <Box flexShrink={0}>
              <MoveControls
                min={min}
                index={index}
                fields={fields}
                remove={remove}
                swap={swap}
              />
            </Box>
          </Flex>

          <FormField name={`${name}[${index}].company`} label="Company">
            <Input name={`${name}[${index}].company`} ref={register} />
          </FormField>

          <FormField name={`${name}[${index}].role]`} label="Role">
            <Input name={`${name}[${index}].role`} ref={register} />
          </FormField>

          <FormField name={`${name}[${index}.from`} label="Start date">
            <Input type="date" name={`${name}[${index}].from`} ref={register} />
          </FormField>

          <FormField name={`${name}[${index}.untill`} label="End date">
            <Input type="date" name={`${name}[${index}].untill`} ref={register} />
          </FormField>

          <FormField name={`${name}[${index}.description`} label="Description">
            <Textarea name={`${name}[${index}].description`} ref={register} />
          </FormField>

          <FormField
            name={`${name}[${index}].stackAndTechniques`}
            label="Stack and techniques"
          >
            <FieldsInput
              name={`${name}[${index}].stackAndTechniques`}
              addButtonLabel="Add stack / technique"
            />
          </FormField>
        </Box>
      ))}
    </>
  );
};

ExperienceInput.defaultProps = {
  min: 0,
};

export default ExperienceInput;

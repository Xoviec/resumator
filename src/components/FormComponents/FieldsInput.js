import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, Button, Flex } from "rebass";
import { Input } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import MoveControls from "./MoveControls";

const FieldsInput = ({ name, addButtonLabel }) => {
  const { control, register } = useFormContext();
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      {fields.map((item, index) => (
        <Flex
          mb={2}
          key={item.id}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box width="100%" mr={1}>
            <Input name={`${name}[${index}].name`} ref={register} />
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
      ))}

      <Button
        onClick={() => append({ name: "" })}
        variant="outline"
        color="white"
        type="button"
      >
        <Icon icon={faPlus} size="sm" /> {addButtonLabel}
      </Button>
    </>
  );
};

export default FieldsInput;

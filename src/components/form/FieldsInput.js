import React from "react";
import { useFieldArray } from "react-hook-form";
import { Box, Button, Flex } from "rebass";
import { Input } from "@rebass/forms";

import MoveControls from "./MoveControls";

const FieldsInput = ({ name, addButtonLabel, control, register }) => {
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      {fields.map((item, index) => (
        <Flex
          mb={1}
          key={item.id}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box width={1} mr={1}>
            <Input name={`${name}[${index}].name`} ref={register()} />
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
      ))}

      <Button onClick={() => append({ name: "" })} variant="outline" color="white">
        {addButtonLabel}
      </Button>
    </>
  );
};

export default FieldsInput;

import React from "react";
import { useFieldArray } from "react-hook-form";
import { Box, Button, Flex } from "rebass";
import { Input } from "@rebass/forms";

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
            <Flex>
              <Box width={1 / 3} mx={1}>
                {index !== fields.length - 1 && (
                  <Button
                    onClick={() => swap(index, index + 1)}
                    variant="outline"
                    color="white"
                  >
                    ↓️
                  </Button>
                )}
              </Box>

              <Box width={1 / 3} mx={1}>
                {index !== 0 && (
                  <Button
                    onClick={() => swap(index, index - 1)}
                    variant="outline"
                    color="white"
                  >
                    ↑
                  </Button>
                )}
              </Box>

              <Box width={1 / 3} ml={1}>
                <Button
                  onClick={() => remove(index)}
                  variant="outline"
                  color="white"
                >
                  ‒
                </Button>
              </Box>
            </Flex>
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

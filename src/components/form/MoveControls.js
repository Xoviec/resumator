import React from "react";
import { Box, Button, Flex } from "rebass";

const MoveControls = ({ index, fields, remove, swap }) => {
  return (
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
        <Button onClick={() => remove(index)} variant="outline" color="white">
          ‒
        </Button>
      </Box>
    </Flex>
  );
};

export default MoveControls;

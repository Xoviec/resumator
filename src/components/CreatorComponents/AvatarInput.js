import React from "react";
import { useFormContext } from "react-hook-form";
import { Flex, Box } from "rebass";
import { Label, Radio } from "@rebass/forms";
import styled from "@emotion/styled";

import avatars from "../../assets/images/avatars";

const Avatar = styled.img`
  height: 10rem;
`;

const AvatarInput = () => {
  const { register } = useFormContext();

  return (
    <Flex flexWrap="wrap">
      {avatars.map((avatar) => (
        <Box key={avatar.name} width={[1 / 2, 1 / 4]} my={1}>
          <Flex flexDirection="column" alignItems="center">
            <Box>
              <Avatar src={avatar.img} />
            </Box>

            <Box my={1}>
              <Label>
                <Radio
                  name="avatar"
                  id={avatar.name}
                  value={avatar.name}
                  register={register()}
                />
              </Label>
            </Box>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default AvatarInput;

import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Flex } from "rebass";
import { Label, Input, Textarea } from "@rebass/forms";

// TODO: remove when firebase values are truly fetched
const firebaseValues = {
  firstName: "John",
  lastName: "Doe",
  birthdate: "1980-01-30",
  city: "Amsterdam",
  introduction: "",
};

function Form() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    // TODO: save values in firebase
    console.log(data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} py={3}>
      <Flex mb={3}>
        <Box width={1 / 2} px={2}>
          <Label htmlFor="firstName">First name</Label>
          <Input
            name="firstName"
            defaultValue={firebaseValues.firstName}
            ref={register({ required: true })}
          />
          {errors.firstName && "First name is required"}
        </Box>

        <Box width={1 / 2} px={2}>
          <Label htmlFor="lastName">Last name</Label>
          <Input
            name="lastName"
            defaultValue={firebaseValues.lastName}
            ref={register({ required: true })}
          />
          {errors.lastName && "Last name is required"}
        </Box>
      </Flex>

      <Flex mb={3}>
        <Box width={1 / 2} px={2}>
          <Label htmlFor="birthdate">Birthdate</Label>
          <Input
            type="date"
            name="birthdate"
            defaultValue={firebaseValues.birthdate}
            ref={register({ required: true })}
          />
          {errors.birthdate && "Birthdate is required"}
        </Box>

        <Box width={1 / 2} px={2}>
          <Label htmlFor="city">City</Label>
          <Input
            name="city"
            defaultValue={firebaseValues.city}
            ref={register({ required: true })}
          />
          {errors.city && "City is required"}
        </Box>
      </Flex>

      <Flex mb={3}>
        <Box width={1} px={2}>
          <Label htmlFor="introduction">Introduction</Label>
          <Textarea
            name="introduction"
            defaultValue={firebaseValues.introduction}
            ref={register({ required: true })}
          />
          {errors.introduction && "Introduction is required"}
        </Box>
      </Flex>

      <Button as="input" type="submit" />
    </Box>
  );
}

export default Form;

import React from "react";
import { useForm } from "react-hook-form";
import { Label, Input } from "@rebass/forms";

// TODO: remove when firebase values are truly fetched
const firebaseValues = {
  firstName: "John",
  lastName: "Doe",
  birthdate: "1980-01-30",
  city: "Amsterdam",
};

function Form() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    // TODO: save values in firebase
    console.log(data);
  };

  return (
    <div>
      <h1>Resume Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="firstName">First name</Label>
        <Input
          name="firstName"
          defaultValue={firebaseValues.firstName}
          ref={register({ required: true })}
        />
        {errors.firstName && "First name is required"}

        <Label htmlFor="lastName">Last name</Label>
        <Input
          name="lastName"
          defaultValue={firebaseValues.lastName}
          ref={register({ required: true })}
        />
        {errors.lastName && "Last name is required"}

        <Label htmlFor="birthdate">Birthdate</Label>
        <Input
          type="date"
          name="birthdate"
          defaultValue={firebaseValues.birthdate}
          ref={register({ required: true })}
        />
        {errors.birthdate && "Birthdate is required"}

        <Label htmlFor="city">City</Label>
        <Input
          name="city"
          defaultValue={firebaseValues.city}
          ref={register({ required: true })}
        />
        {errors.city && "City is required"}

        <input type="submit" />
      </form>
    </div>
  );
}

export default Form;

import React from "react";
import { useForm } from "react-hook-form";

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
        <input
          name="firstName"
          defaultValue={firebaseValues.firstName}
          ref={register({ required: true })}
        />
        {errors.firstName && "First name is required"}

        <input
          name="lastName"
          defaultValue={firebaseValues.lastName}
          ref={register({ required: true })}
        />
        {errors.lastName && "Last name is required"}

        <input
          name="city"
          defaultValue={firebaseValues.city}
          ref={register({ required: true })}
        />
        {errors.city && "City is required"}

        <input
          type="date"
          name="birthdate"
          defaultValue={firebaseValues.birthdate}
          ref={register({ required: true })}
        />
        {errors.birthdate && "Birthdate is required"}

        <input type="submit" />
      </form>
    </div>
  );
}

export default Form;

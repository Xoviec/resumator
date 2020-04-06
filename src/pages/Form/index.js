import React from "react";
import { useForm } from "react-hook-form";

function Form() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Resume Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="firstName"
          defaultValue=""
          ref={register({ required: true })}
        />
        {errors.firstName && "First name is required"}

        <input
          name="lastName"
          defaultValue=""
          ref={register({ required: true })}
        />
        {errors.lastName && "Last name is required"}

        <input name="city" defaultValue="" ref={register({ required: true })} />
        {errors.city && "City is required"}

        <input
          type="date"
          name="birthdate"
          defaultValue=""
          ref={register({ required: true })}
        />
        {errors.birthdate && "Birthdate is required"}

        <input type="submit" />
      </form>
    </div>
  );
}

export default Form;

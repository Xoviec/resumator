import React, { FunctionComponent, useState } from "react";
import { useFormContext } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, DatePickerProps, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

type FormDatePickerProps = Omit<DatePickerProps, "value" | "onChange">;

export const FormDatePicker: FunctionComponent<FormDatePickerProps> = ({ name, ...props }) => {
  const { register, getValues, setValue } = useFormContext();
  const [date, setDate] = useState(getValues()[name!]);

  const handleChange = (selectedDate: MaterialUiPickersDate) => {
    setValue(name!, selectedDate);
    setDate(selectedDate!);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        fullWidth
        variant="inline"
        inputVariant="outlined"
        size="small"
        format="dd-MM-yyyy"
        name={name}
        value={date}
        inputRef={register}
        onChange={handleChange}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};
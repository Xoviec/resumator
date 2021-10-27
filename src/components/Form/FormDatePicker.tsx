import { VoidFunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DesktopDatePicker, DatePickerProps } from "@mui/lab";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

type FormDatePickerProps = Omit<
  DatePickerProps,
  "value" | "onChange" | "renderInput"
> & {
  name: string;
};

export const FormDatePicker: VoidFunctionComponent<FormDatePickerProps> = ({
  name,
  label,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        defaultValue={null}
        control={control}
        name={name!}
        render={({ value, onChange }) => (
          <DesktopDatePicker
            inputFormat="MM-yyyy"
            value={value}
            onChange={onChange}
            renderInput={(textFieldProps) => (
              <TextField
                name={name}
                label={label}
                size="small"
                sx={{ flex: 1 }}
                {...textFieldProps}
              />
            )}
            views={["year", "month"]}
            {...props}
          />
        )}
      />
    </LocalizationProvider>
  );
};

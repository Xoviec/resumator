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
  inputFormat = "MM-yyyy",
  views = ["year", "month"],
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
            inputFormat={inputFormat}
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
            views={views}
            {...props}
          />
        )}
      />
    </LocalizationProvider>
  );
};

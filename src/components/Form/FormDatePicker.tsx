import { useEffect, useState, VoidFunctionComponent } from "react";
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
  onDateSet?: (val: Date) => void;
};

export const FormDatePicker: VoidFunctionComponent<FormDatePickerProps> = ({
  name,
  label,
  inputFormat = "MM-yyyy",
  views = ["year", "month"],
  ...props
}) => {
  const { control, resetField } = useFormContext();
  const [error, setError] = useState<string>();
  const handleError = (errorType: string | null) => {
    const type = errorType || "";
    if (["disablePast", "minDate"].includes(type)) {
      setError("Looks like the date is from the past.🤔");
    } else if (["disableFuture", "maxDate"].includes(type)) {
      setError("No future date, please!😅");
    } else {
      setError("");
    }
  };

  useEffect(() => () => resetField(name), [resetField, name]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        defaultValue={null}
        control={control}
        name={name!}
        render={({ field: { onChange, value } }) => (
          <DesktopDatePicker
            inputFormat={inputFormat}
            value={value}
            label={label}
            onError={handleError}
            onAccept={(val) => {
              if (props.onDateSet) {
                props.onDateSet(val);
              }
            }}
            onChange={onChange}
            renderInput={(textFieldProps) => (
              <TextField
                role="input"
                name={name}
                helperText={error}
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

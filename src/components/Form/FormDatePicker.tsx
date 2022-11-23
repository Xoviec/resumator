import { DesktopDatePicker, DatePickerProps } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField } from "@mui/material";
import { useEffect, VoidFunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";

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
  const {
    control,
    resetField,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();
  const handleError = (errorType: string | null) => {
    const type = errorType || "";
    if (["disableFuture", "maxDate", "disablePast", "minDate"].includes(type)) {
      setError(name, { type: "custom", message: "Please enter valid date." });
    } else {
      clearErrors(name);
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
                helperText={errors[name] && errors[name]["message"]}
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

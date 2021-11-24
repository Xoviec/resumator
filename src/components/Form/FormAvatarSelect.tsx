import { VoidFunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  FormControl,
  FormControlProps,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { avatars } from "../../assets/images/avatars/avatars";
import { colors } from "../../config/theme";

interface FormAvatarSelectProps extends FormControlProps {
  name: string;
  label: string;
}

export const FormAvatarSelect: VoidFunctionComponent<FormAvatarSelectProps> = ({
  name,
  label,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      defaultValue="1"
      control={control}
      name={name!}
      render={({field: { onChange, value }}) => (
        <FormControl fullWidth size="small" {...props}>
          <InputLabel shrink variant="outlined" htmlFor="form-avatar-selector-input">
            {label}
          </InputLabel>
          <OutlinedInput
            fullWidth
            notched
            id="form-avatar-selector-input"
            label={label}
            inputComponent={() => (
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="center"
              >
                {avatars.map((avatar, i) => (
                  <Box
                    component="span"
                    sx={{
                      width: "100px",
                      height: "200px",
                      margin: "16px",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      cursor: "pointer",
                      backgroundImage: `url(${avatar.img})`,

                      "&:hover": {
                        outline: `2px auto ${colors.darkBlue}`,
                      },

                      ...(avatar.name === value
                        ? { outline: `2px auto ${colors.orange}` }
                        : {}),
                    }}
                    key={i}
                    onClick={() => onChange(avatar.name)}
                  />
                ))}
              </Box>
            )}
          />
        </FormControl>
      )}
    />
  );
};

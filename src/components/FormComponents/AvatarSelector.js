import React from "react";
import avatars from "../../assets/images/avatars";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../config/theme";

const useStyles = makeStyles(() => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    width: 112,
    height: 240,
    backgroundColor: "transparent",
    backgroundSize: "cover",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      borderColor: "red",
    },
    border: "2px solid transparent",
  },
  checkedIcon: {
    borderColor: colors.orange,
  },
}));

const StyledRadio = (props) => {
  const classes = useStyles();
  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={
        <span
          className={[classes.icon, classes.checkedIcon].join(" ")}
          style={{
            backgroundImage: `url(${props.avatar})`,
            backgroundRepeat: "no-repeat",
          }}
        />
      }
      icon={
        <span
          className={classes.icon}
          style={{
            backgroundImage: `url(${props.avatar})`,
            backgroundRepeat: "no-repeat",
          }}
        />
      }
      {...props}
    />
  );
};

const AvatarSelector = ({ name, label, onChange, value }) => {
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row aria-label="avatar" name={name} onChange={onChange}>
        {avatars.map((avatar, i) => (
          <FormControlLabel
            key={i}
            value={avatar.name}
            control={
              <StyledRadio avatar={avatar.img} checked={value === avatar.name} />
            }
          />
        ))}
      </RadioGroup>
    </>
  );
};

export default AvatarSelector;

import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
  top: {
    color: theme.palette.secondary.main,
    animationDuration: "550ms",
  },
  circle: {
    strokeLinecap: "round",
  },
}));

export default function CustomizedSpinner(props) {
  const classes = useStylesFacebook();

  return (
    <CircularProgress
      variant="indeterminate"
      disableShrink
      className={classes.top}
      classes={{
        circle: classes.circle,
      }}
      size={40}
      thickness={4}
      {...props}
    />
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "#cc2b5e",
  },
  tooltip: {
    backgroundColor: "#cc2b5e",
    zIndex: 10000,
  },
}));

export default function CustomTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
CustomTooltip.propTypes = {
  title: PropTypes.string,
};

import {
  AppBar,
  Card,
  CardContent,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import "./index.less";
export default function AdminBaseComponent(props) {
  const { icon, title, rightComponents } = props;
 
  return (
    <div className="admin-component-root">
   
      <AppBar color="secondary" position="relative">
        <Toolbar>
          {icon}
          <Typography color="primary">{title}</Typography>
          <div className="header-right">{rightComponents}</div>
        </Toolbar>
      </AppBar>
      <Card className="content-card">
        <CardContent>{props.children}</CardContent>
      </Card>
    </div>
  );
}
AdminBaseComponent.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.element,
  rightComponents: PropTypes.array,
};

import { Menu, MenuItem } from "@material-ui/core";
import React from "react";
import './index.less'
export default function Pallet({
  anchor,
  handleClose,
  themes,
  handleThemeChange,
}) {
    const changeTheme = (theme) => {
        handleThemeChange(theme)
        handleClose()
    }
  return (
    <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose}>
      {themes?.map((val, index) => (
        <MenuItem
          onClick={() => changeTheme(val)}
          key={val + "-" + index}
        >
            <div className={`theme-demo theme-${val}`}></div>
          {val}
        </MenuItem>
      ))}
    </Menu>
  );
}

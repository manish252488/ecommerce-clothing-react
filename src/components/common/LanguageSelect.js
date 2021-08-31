import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { ExpandMore, TranslateOutlined } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../../store/actions";
const lang = [
  {
    key: "en",
    name: "English",
  },
  {
    key: "ge",
    name: "German",
  },
];

export default function LanguageSelect() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector(({ language }) => language.selected);
  useEffect(() => {
    if (language && language !== "" && language?.length > 0) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const selectLanguage = (la, ev) => {
    dispatch(changeLang(la));
    handleClose(ev);
  };
  return (
    <div className="language-selector">
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        startIcon={<TranslateOutlined />}
        endIcon={<ExpandMore />}
      >
        {i18n.language}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper elevation={5}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                  {lang.map((val, index) => (
                    <MenuItem
                      key={index}
                      onClick={(event) => selectLanguage(val.key, event)}
                    >
                      {val.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

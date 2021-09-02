import {
  Backdrop,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { renderIfElse } from "../../config/Utils";
import Login from "./Login";
import SignUp from "./Signup";
import "./index.less";
import { CloseOutlined, Facebook, Instagram, LockOutlined, PersonOutlined, Twitter } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { authPage } from "../../store/actions";
import History from "../../@history";
import { loginPage } from "../../assets";

const tabs = {
  login: "login",
  signup: "signup",
};
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  close: {
    position: "absolute",
    right: 0,
    top: 0,
  },
}));
const Authpage = (props) => {
  const classes = useStyles();
  let initalDisplay = History.location.pathname === '/login';
  const dispatch = useDispatch();
  const [tab, setTab] = useState(tabs.login);
  let display = useSelector(({ Auth }) => Auth.showAuthPage);
  const handleClose = () => {
    dispatch(authPage(false));
  };
  useEffect(() => {
    if (display || initalDisplay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [display, initalDisplay]);
  return (
    <Backdrop className={classes.backdrop} open={display?display:initalDisplay}>
      <Card className="auth-card" component={Paper}>
        {!initalDisplay && <IconButton
          className={classes.close}
          onClick={handleClose}
          size="medium"
        >
          <CloseOutlined fontSize="inherit" />
        </IconButton>}
        <div className="image" style={{ backgroundImage: `url(${loginPage})` }}>
          <div className="nav-bar">
            <Typography variant="h6">Follow us on:</Typography>
            <Button startIcon={<Facebook /> } variant="outlined">@DapperFolks</Button>
            <Button startIcon={<Instagram /> } variant="outlined">@dapper.folks</Button>
            <Button startIcon={<Twitter /> } variant="outlined">@DapperFolks</Button>
          </div>
        </div>
        <CardContent>
          <div className="web-view">
            <img className="icon" src="assets/images/logo-dark.svg" alt="logo"/>
          </div> 
          <ButtonGroup style={{ marginTop: 20}}>
            <Button
              className={tab === tabs.login ? "active" : ""}
              onClick={() => setTab(tabs.login)}
            >
              <LockOutlined color="primary"/>
              Login
            </Button>
            <Button
              className={tab === tabs.signup ? "active" : ""}
              onClick={() => setTab(tabs.signup)}
            >
              <PersonOutlined color="primary"/>
              Sign Up
            </Button>
          </ButtonGroup>
          <div className="tabs">
            {renderIfElse(tab === tabs.login, <Login />, <SignUp />)}
          </div>
        </CardContent>
      </Card>
    </Backdrop>
  );
};
export default Authpage;

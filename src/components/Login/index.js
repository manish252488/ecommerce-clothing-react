import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { renderIfElse } from "../../config/Utils";
import Login from "./Login";
import SignUp from "./Signup";
import "./index.less";
import { Facebook, Instagram, LockOutlined, PersonOutlined, Twitter } from "@material-ui/icons";
import { useSelector } from "react-redux";
import History from "../../@history";
import { loginPage } from "../../assets";

const tabs = {
  login: "login",
  signup: "signup",
};

const Authpage = (props) => {
  const [tab, setTab] = useState(tabs.login);
  const isAuthenticated = useSelector(({Auth}) => Auth.isAuthenticated)
  if(isAuthenticated){
    History.replace("/home")
  }

  return (
    <Card className="auth-card" component={Paper}>
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
  )

};
export default Authpage;

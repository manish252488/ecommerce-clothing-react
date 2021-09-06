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
import { SocialLinks } from '../../config/constants/constants'
const tabs = {
  login: "login",
  signup: "signup",
};

const Authpage = (props) => {
  const [tab, setTab] = useState(tabs.login);
  const isAuthenticated = useSelector(({ Auth }) => Auth.isAuthenticated)
  if (isAuthenticated) {
    History.replace("/home")
  }

  return (
    <Card className="auth-card" component={Paper}>
      <div className="image" style={{ backgroundImage: `url(${loginPage})` }}>
        <div>
            <img className="icon" src="assets/images/logo-dark.svg" alt="logo" />
        </div>
        <div className="nav-bar">
          <Button fullWidth startIcon={<Facebook />} variant="contained" target="_blank" href={SocialLinks.Facebook}><Typography>@dapperfolks</Typography></Button>
          <Button fullWidth startIcon={<Instagram />} variant="contained" target="_blank" href={SocialLinks.Instagram}>@dapper.folks</Button>
          <Button fullWidth startIcon={<Twitter />} variant="contained" target="_blank" href={SocialLinks.twitter}>@DapperFolks</Button>
        </div>
      </div>
      <CardContent className="auth-card-tabs">
        {/*  <ButtonGroup>
        <Button
          variant="contained"
          color={tab === tabs.login ? "primary" : "secondary"}
          onClick={() => setTab(tabs.login)}
        >
          <LockOutlined color={tab === tabs.login ? "secondary" : "primary"}/>
          Login
        </Button>
        <Button
         variant="contained"
          color={tab === tabs.signup ? "primary" : "secondary"}
          onClick={() => setTab(tabs.signup)}
        >
          <PersonOutlined color={tab === tabs.signup ? "secondary" : "primary"}/>
          Sign Uplogin
        </Button>
      </ButtonGroup> */}
        <div className="tabs">
          {renderIfElse(tab === tabs.login, <Login changeTab={() => setTab(tabs.signup)} />,
            <SignUp changeTab={() => setTab(tabs.login)} />)}
        </div>
      </CardContent>
    </Card>
  )

};
export default Authpage;

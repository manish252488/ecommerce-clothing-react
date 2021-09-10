import {
  Button,
  Card,
  CardContent,
  Grid,
  Hidden,
  IconButton,
  Paper,
  Typography,
  Link
} from "@material-ui/core";
import React, { useState } from "react";
import { renderIfElse } from "../../config/Utils";
import Login from "./Login";
import SignUp from "./Signup";
import "./index.less";
import { ArrowBackIos, Facebook, Instagram, Twitter } from "@material-ui/icons";
import { useSelector } from "react-redux";
import History from "../../@history";
import { loginPage, logoIcon } from "../../assets";
import { SocialLinks } from '../../config/constants/constants'
import { useParams } from "react-router";
import Logo from "../common/Logo";
const tabs = {
  login: "login",
  signup: "signup",
};

const Authpage = (props) => {
  const { tab: current } = useParams()
  const [tab, setTab] = useState(current || tabs.login);
  const isAuthenticated = useSelector(({ Auth }) => Auth.isAuthenticated)

  if (isAuthenticated) {
    History.replace("/home")
  }

  return (
    <Card className="auth-card" component={Paper}>
      <IconButton color="secondary" className="iconback" onClick={() => History.goBack()}>
      <ArrowBackIos color="primary" />
      </IconButton>
      <Hidden mdDown>
        <div className="image" style={{ backgroundImage: `url(${loginPage})` }}>
          <div>
            <img className="icon" src={logoIcon} alt="logo" />
          </div>
          <div className="nav-bar">
            <Button fullWidth startIcon={<Facebook />} variant="contained" target="_blank" href={SocialLinks.Facebook}><Typography>@dapperfolks</Typography></Button>
            <Button fullWidth startIcon={<Instagram />} variant="contained" target="_blank" href={SocialLinks.Instagram}>@dapper.folks</Button>
            <Button fullWidth startIcon={<Twitter />} variant="contained" target="_blank" href={SocialLinks.twitter}>@DapperFolks</Button>
          </div>
        </div>
      </Hidden>
      <CardContent className="auth-card-tabs">
        <div className="tabs">
      
            <Logo style={{ width: '50%', height: 'auto', marginLeft: '25%' }} />
     
          {renderIfElse(tab === tabs.login, <Login changeTab={() => setTab(tabs.signup)} />,
            <SignUp changeTab={() => setTab(tabs.login)} />)}
        </div>
        <Grid container>
          <Grid item xs={12} style={{position: 'absolute',bottom: 5,right:5}}><Link to="/terms-of-use" >Terms of use</Link>&nbsp;&nbsp; <Link  to="/privacy-policies">Privacy policies</Link></Grid>
        </Grid>
      </CardContent>
    </Card>
  )

};
export default Authpage;

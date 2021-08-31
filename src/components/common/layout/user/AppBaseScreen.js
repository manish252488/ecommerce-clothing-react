import { AppBar, Button, IconButton, makeStyles, Toolbar, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../index.less";
import PropTypes from "prop-types";
import Logo from "../../Logo";
import { authPage, checkJWT } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { HomeOutlined, PermContactCalendarOutlined, Person, SettingsOutlined, ShoppingCartRounded } from "@material-ui/icons";
import ProfileMenu from "./ProfileMenu";
import Footer from "../../Footer";
import History from "../../../../@history";
const useStyles = makeStyles({
  root: {
    background: '#ddd'
  }
})
const AppBaseScreen = (props) => {
  const classes = useStyles()/* 
  const [isMobileNavOpen, setMobileNavOpen] = useState(false); */
  const {
    children,
    toolbarLeftItem,
    toolbarRightItem,
    showHeader,
  } = props;
  const dispatch = useDispatch();
  const isAuth = useSelector(({ Auth }) => Auth?.isAuthenticated)
  const [isLoggedIn, setIsLoggedIn] = useState(isAuth)
  useEffect(() => {
    dispatch(checkJWT(null, onfailure));
  }, [dispatch]);
  const onfailure = (val) => {
    if (!val) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }
  const showAuthPanel = () => {
    dispatch(authPage(true))
  }
  return (
    <div className={classes.root}>
      {showHeader && (
        <AppBar>
          <Toolbar>
            {/* <Hidden lgUp>
              <IconButton onClick={() => setMobileNavOpen(true)} lgUp>
                <MenuOpenOutlined color="secondary" />
              </IconButton>
            </Hidden> */}
            <Logo />
            {toolbarLeftItem}
            <div style={{ flexGrow: 1 }}>{toolbarRightItem}</div>
            <Button
          onClick={() => History.push("/")}
          startIcon={<HomeOutlined />}
          color="inherit"
          variant="text"
        >
          home
        </Button>
            <Button
              onClick={() => History.push("/services")}
              startIcon={<SettingsOutlined />}
              color="inherit"
              variant="text"
            >
              services
            </Button>
            <Button
              onClick={() => History.push("/contacts")}
              startIcon={<PermContactCalendarOutlined />}
              color="inherit"
              variant="text"
            >
              contact
            </Button>
            {
              isLoggedIn && (<>
                <ProfileMenu />
                <Tooltip arrow={true} placement="bottom" title="cart">
                  <IconButton onClick={() => { }}><ShoppingCartRounded color="secondary" /></IconButton>
                </Tooltip>
              </>
              )
            }
            {
              !isLoggedIn && (
                <Button onClick={showAuthPanel} startIcon={<Person color="secondary" />} variant="outlined" color="secondary">
                  Register/Login</Button>
              )
            }
          </Toolbar>
        </AppBar>
      )}
      {/*  <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      /> */}
      {/* <div className="body"> */}
      <Loader />
      {children}
      {/* </div> */}
      {/*    Footer sett*/}
      {/*  <div className="footer">
        {footerItems && footerItems}
        <Copyright />
      </div> */}
      <Footer />
    </div>
  );
};
AppBaseScreen.propTypes = {
  children: PropTypes.any,
  footerItems: PropTypes.array,
  toolbarLeftItem: PropTypes.array,
  toolbarRightItem: PropTypes.array,
  showHeader: PropTypes.bool,
};
AppBaseScreen.defaultProps = {
  showHeader: true,
};
export default AppBaseScreen;

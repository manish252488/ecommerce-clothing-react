import { AppBar, Button, Hidden, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../index.less";
import PropTypes from "prop-types";
import Logo from "../../Logo";
import { authPage, checkJWT, listCart } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { HomeOutlined, MenuOpenOutlined, PermContactCalendarOutlined, Person, ShoppingCartRounded } from "@material-ui/icons";
import ProfileMenu from "./ProfileMenu";
import Footer from "../../Footer";
import History from "../../../../@history";
import ChatBot from "../../ChatBot";
import StyledBadge from "../../StyledBadge";
import CustomTooltip from "../../CustomTooltip";
import NavBar from './NavBar'
const useStyles = makeStyles({
  root: {
    background: '#fff'
  }
})
const AppBaseScreen = (props) => {
  const classes = useStyles()
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const {
    children,
    toolbarLeftItem,
    toolbarRightItem,
    showHeader,
  } = props;
  const dispatch = useDispatch();
  const isAuth = useSelector(({ Auth }) => Auth?.isAuthenticated)
  const [isLoggedIn, setIsLoggedIn] = useState(isAuth)
  const cart = useSelector(({ Auth }) => Auth.cart)
  useEffect(() => {
    setIsLoggedIn(isAuth)
  }, [isAuth])
  useEffect(() => {
    dispatch(checkJWT(null, onfailure));
    dispatch(listCart())
  }, [dispatch]);
  const onfailure = (val) => {
    if (!val) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }
  const showAuthPanel = () => {
    // dispatch(authPage(true))
    History.push("/login")
  }
  return (
    <div className={classes.root}>
      {showHeader && (
        <AppBar >
          <Toolbar>
            <Hidden mdUp>
              <IconButton onClick={() => setMobileNavOpen(true)} mdUp>
                <MenuOpenOutlined color="secondary" />
              </IconButton>
            </Hidden>
            <Logo />
            {toolbarLeftItem}
            <Hidden xsDown>
            <div style={{ flexGrow: 1 }}>{toolbarRightItem}</div>
            </Hidden>
            <Hidden xsDown>
              <Button
                onClick={() => History.push("/")}
                startIcon={<HomeOutlined />}
                color="primary"
                variant="text"
              >
                home
              </Button>
              <Button
                onClick={() => History.push("/contact")}
                startIcon={<PermContactCalendarOutlined />}
                color="primary"
                variant="text"
              >
                contact
              </Button>
            </Hidden>
            {
              isLoggedIn && (<>

                <Hidden xsDown>
                  <ProfileMenu />
                </Hidden>
                <CustomTooltip arrow={true} placement="bottom" title="cart">
                  <IconButton onClick={() => { History.push("/payment") }}>
                    <StyledBadge badgeContent={cart ? cart.length : 0} color="primary">
                      <ShoppingCartRounded color="secondary" />
                    </StyledBadge>
                  </IconButton>
                </CustomTooltip>
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
      <Hidden mdUp>
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      </Hidden>
      <Loader />
      <div className="body2">
        <ChatBot />
        {children}
      </div>
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

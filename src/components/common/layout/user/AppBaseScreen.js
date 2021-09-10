import { AppBar, Button, Chip, Hidden, IconButton, makeStyles, Toolbar, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../index.less";
import PropTypes from "prop-types";
import Logo from "../../Logo";
import { checkJWT, listCart } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Person, ShoppingCartRounded } from "@material-ui/icons";
import ProfileMenu from "./ProfileMenu";
import History from "../../../../@history";
import StyledBadge from "../../StyledBadge";
import NavBar from './NavBar'
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import {useStyles} from './AppBaseScreen.Styles'
const AppBaseScreen = (props) => {
  const theme = useTheme();
  const classes = useStyles()
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const {
    children,
    showHeader,
  } = props;
  const dispatch = useDispatch();
  const cart = useSelector(({ Auth }) => Auth.cart)
  const isAuth = useSelector(({ Auth }) => Auth?.isAuthenticated)
  const [isLoggedIn, setIsLoggedIn] = useState(isAuth)
  const searchBar = History.location.pathname ==="/home"
  const [value, setValue] = useState(0)
  useEffect(() => {
    setValue(cart ? cart.length : 0)
  }, [cart])
  useEffect(() => {
    setIsLoggedIn(isAuth)
  }, [isAuth])
  useEffect(() => {
    dispatch(checkJWT(null, onfailure));
    dispatch(listCart())
  }, []);
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
    <div className={classes.root} >
      {showHeader && (
        <AppBar className={classes.app} position={theme.breakpoints.down("md") && searchBar ? "relative": "sticky"} variant="outlined">
          <Toolbar>
            <Hidden mdUp>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="primary"
                aria-label="open drawer"
                onClick={() => setMobileNavOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Logo />

            <div className={classes.Grow} />
            <Hidden mdDown>
              <div className={classes.search}>
                <IconButton className={classes.searchIcon}>
                  <SearchIcon color="primary" />
                </IconButton>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />

              </div>
            </Hidden>
            <div className={classes.Grow} />
            <div className={classes.flex}>
              {isLoggedIn && <Hidden mdDown>
                <ProfileMenu />
              </Hidden>}
              {
                isLoggedIn && (<>
                  <Hidden xsDown>

                    <Chip
                      icon={<AccountBalanceWalletIcon color="secondary" />}
                      clickable
                      label={`${'wallet'}: ${'Available soon!'}`}
                      color="primary"
                    />
                  </Hidden>
                  <IconButton onClick={() => History.push("/cart")}>
                    <StyledBadge badgeContent={value} color="primary">
                      <ShoppingCartRounded color="primary" />
                    </StyledBadge>
                  </IconButton>
                </>
                )
              }

              {
                !isLoggedIn && (
                  <Button onClick={showAuthPanel} startIcon={<Person color="primary" />} variant="contained" color="secondary" size="small">
                    Login</Button>
                )
              }
              {
                isLoggedIn && (<Hidden mdUp>
                  <IconButton onClick={() => History.push("/profile")}>
                    <Person color="primary" />
                  </IconButton>
                </Hidden>
                )
              }
            </div>
          </Toolbar>
        </AppBar>
      )}
     {searchBar && <Hidden mdUp>
        <AppBar position="sticky" className={classes.nav}>
          <Toolbar className={classes.navTool}>
          <div className={classes.search2}>
            <div className={classes.searchIcon2}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot2,
                input: classes.inputInput2,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          </Toolbar>
        </AppBar>
      </Hidden>}
      <Hidden mdUp>
        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
      </Hidden>
      <div className="body2">
        {children}
      </div>
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

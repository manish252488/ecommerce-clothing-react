import { AppBar, Button, Chip, Hidden, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../index.less";
import PropTypes from "prop-types";
import Logo from "../../Logo";
import { checkJWT, listCart } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { HomeOutlined, LocalShipping, MenuOpenOutlined, Money, PermContactCalendarOutlined, Person, ShoppingCartRounded } from "@material-ui/icons";
import ProfileMenu from "./ProfileMenu";
import Footer from "../../Footer";
import History from "../../../../@history";
import ChatBot from "../../ChatBot";
import StyledBadge from "../../StyledBadge";
import NavBar from './NavBar'
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import InputBase from '@material-ui/core/InputBase';
import { alpha } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import NavLinks from "./NavLinks";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'transparent',
    alignSelf: 'right',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(5),
      width: '30%',

    },
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(1),
      width: 'auto',

    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Grow: {
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      flexGrow: 'unset'
    },
  },
  inputRoot: {
    color: theme.palette.primary.main,

  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),

    borderRadius: 10,

    width: '100%',
    [theme.breakpoints.up('md')]: {
      backgroundColor: alpha(theme.palette.common.white, 0.95),
      border: '1px solid #ddd',
    },
    [theme.breakpoints.down('md')]: {
      width: '0ch',
      '&:focus': {
        border: '1px solid #ddd',
        borderRadius: 10,
        width: '17ch',
        backgroundColor: alpha(theme.palette.common.white, 0.95)
      },
    },
  },
  flex: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center'
  },
  app: {
    backgroundColor: theme.palette.secondary.main,
  },
  nav: {
    backgroundColor: theme.palette.primary.main,
  },
  navTool: {
    minHeight: 'unset',
    padding: 5
  }
}));
const AppBaseScreen = (props) => {
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
        <AppBar className={classes.app} position="sticky" variant="outlined">
          <Toolbar>
            <div className="web">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="primary"
                aria-label="open drawer"
                onClick={() => setMobileNavOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Hidden mdDown>
              <Logo />
            </Hidden>
            <div className="web">
              <div className={classes.Grow} />
            </div>
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
            <Hidden mdDown>
              <div className={classes.Grow} />
            </Hidden>
            <div className={classes.flex}>

              {
                isLoggedIn && (<>
                  <Hidden xsDown>
                    <ProfileMenu />
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
                  <Hidden xsDown>
                    <Button onClick={showAuthPanel} startIcon={<Person color="primary" />} variant="contained" color="secondary" size="small">
                      Login</Button>
                  </Hidden>
                )
              }
              <Hidden xsDown>
                <IconButton onClick={() => History.push("/contact-support")}>
                  <ContactSupportIcon color="primary" />
                </IconButton>
              </Hidden>
            </div>
          </Toolbar>
        </AppBar>
      )}
      {History.location.pathname === "/home" && <Hidden mdDown>
        <AppBar position="static" className={classes.nav}>
          <Toolbar className={classes.navTool}>
            <NavLinks />
          </Toolbar>
        </AppBar>
      </Hidden>}

      <div className="web">
        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
      </div>
      <Loader />
      <div className="body2">
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

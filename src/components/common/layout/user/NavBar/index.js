import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.less";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import CategoryIcon from '@material-ui/icons/Category';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PersonIcon from '@material-ui/icons/Person';
import InfoIcon from '@material-ui/icons/Info';
import {
  Drawer,
  Grid,
  Hidden,
  Divider,
  Button,
  makeStyles
} from "@material-ui/core";
import { useSelector } from "react-redux";
import History from "../../../../../@history";
import { Person, PersonAddOutlined, PowerOffOutlined } from "@material-ui/icons";
import { defaultUser, logoLight } from "../../../../../assets";
import SignOut from "../../../../auth/SignOut";

const useStyles = makeStyles(theme => ({
  primary: {
    background: theme.palette.primary.light
  }
}))
const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const isAuth = useSelector(({ Auth }) => Auth.isAuthenticated)
  const user = useSelector(({ Auth }) => Auth.user)
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Grid container>
      {isAuth && <Grid item xs={12} className={classes.primary + " profile-container-1"}>
        <img src={defaultUser} className="image" alt="profile" />
        <Typography variant="h6">{user.name}</Typography>
      </Grid>}
      {
        !isAuth && <Grid item xs={12} className={classes.primary + " profile-container-1"}>
          <img src={logoLight} className="image" alt="profile" />
        </Grid>
      }
      <Grid item xs={12}>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <AccountBalanceWalletIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">wallet</Typography>
          </MenuItem>
          <MenuItem onClick={() => History.push("/categories")}>
            <ListItemIcon>
              <CategoryIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">categories</Typography>
          </MenuItem>
          <MenuItem onClick={() => History.push("/offers")}>
            <ListItemIcon>
              <LocalOfferIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Offer Zone
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => History.push("/myorders")}>
            <ListItemIcon>
              <LocalShippingIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              My Orders
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => History.push("/profile")}>
            <ListItemIcon>
              <PersonIcon color="primary" color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Profile
            </Typography>
          </MenuItem>
          <Divider />
          <div className="grow"></div>
          <MenuItem onClick={() => History.push("/about")}>
            <ListItemIcon>
              <InfoIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography color="textSecondary" variant="inherit" noWrap>
              About
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => History.push("/contact-support")}>
            <ListItemIcon>
              <Person color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography color="textSecondary" variant="inherit" noWrap>
              Contact
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => History.push("/contact-support")}>
            <SignOut>
              <Typography color="textSecondary" variant="inherit" noWrap>
                Logout
              </Typography>
              <ListItemIcon>
              <PowerOffOutlined color="primary" fontSize="small" />
            </ListItemIcon>
            </SignOut>
          </MenuItem>
        </MenuList>

      </Grid>
    </Grid>
  );

  return (
    <>
      <Hidden >
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer anchor="left" open variant="persistent">
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false,
};

export default NavBar;

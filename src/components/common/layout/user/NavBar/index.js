import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.less";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import CategoryIcon from '@material-ui/icons/Category';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
import InfoIcon from '@material-ui/icons/Info';
import {
  Drawer,
  Grid,
  Hidden,
  Divider,
  Button
} from "@material-ui/core";
import { useSelector } from "react-redux";
import History from "../../../../../@history";


const NavBar = ({ onMobileClose, openMobile }) => {
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
      {isAuth && <Grid item xs={12} className="profile-container ">
        <img src={user.picture || "assets/images/logo-dark.png"} className="image" alt="profile" />
        <Typography variant="h6">{user.name}</Typography>
      </Grid>}
      {
        !isAuth && <Grid item xs={12} className="profile-container-1 ">
           <img src="assets/images/logo-dark.png" className="image" alt="profile" />
          <Button onClick={() => History.push("/login")} variant="contained" size="small" color="secondary">Login</Button>
        </Grid>
      }
      <Grid item xs={12}>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <AccountBalanceWalletIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">wallet</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <CategoryIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">categories</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <LocalOfferIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              offer zone
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <LocalShippingIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              my orders
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              profile
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ReceiptIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              vouchers & offers
            </Typography>
          </MenuItem>
          <Divider />
          <div className="grow"></div>
          <MenuItem>
            <ListItemIcon>
              <InfoIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              about
            </Typography>
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

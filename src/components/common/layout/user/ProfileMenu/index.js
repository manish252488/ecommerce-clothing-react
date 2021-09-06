import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import SignOut from '../../../../auth/SignOut';
import { ListItemIcon, makeStyles, Typography } from '@material-ui/core';
import { LocalShipping, Person } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import History from '../../../../../@history';
const  useStyles = makeStyles(theme => ({
    text: {
        textTransform: "capitalize"
    },
    profilepic: {
      width:60,
      height: 60,
      borderRadius: 50,
      marginRight: 20,
      background: theme.palette.common.white
    },
    profileicon : {
      width:30,
      height: 30,
      borderRadius: 50,
      background: theme.palette.common.white
    }
}))
export default function ProfileMenu() {
    const classes = useStyles();
    const user = useSelector(({Auth}) => Auth?.user)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="default" color="primary" startIcon={/* user.picture */ true ? <img className={classes.profileicon} src={"assets/images/logo-dark.png"} alt="profile"/>:<Person color="primary"/>} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} size="small">
        <span className={classes.text}>{user.name}</span>
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
        <ListItemIcon>
        {user.picture && <img className={classes.profilepic} src={"assets/images/logo-dark.png"} alt="profile"/>}
                {!user.picture && <Person/>}
          </ListItemIcon>
                
            <Typography>{user.name}</Typography>
        </MenuItem>
        <MenuItem onClick={() => History.push("/myorders")}>
          <ListItemIcon>
            <LocalShipping/>
          </ListItemIcon>
          <Typography>My orders</Typography>
        </MenuItem>
        <MenuItem><SignOut>
          <ListItemIcon>
          <ExitToAppIcon />
          </ListItemIcon>
          <Typography>logout</Typography>
          </SignOut></MenuItem>
      </Menu>
    </div>
  );
}
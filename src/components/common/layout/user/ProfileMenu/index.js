import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import SignOut from '../../../../auth/SignOut';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { useSelector } from 'react-redux';
const  useStyles = makeStyles(theme => ({
    text: {
        textTransform: "capitalize"
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
      <Button startIcon={user.picture ? <img src={user.picture} alt="profile"/>:<Person color="secondary"/>} variant="outlined" color="secondary" aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
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
                {user.picture && <img src={user.picture} alt="profile"/>}
                {!user.picture && <Person/>}
            <Typography>{user.name}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>My orders</MenuItem>
        <MenuItem onClick={handleClose}><SignOut>Logout</SignOut></MenuItem>
      </Menu>
    </div>
  );
}
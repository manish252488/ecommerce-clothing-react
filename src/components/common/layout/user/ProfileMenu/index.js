import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import SignOut from '../../../../auth/SignOut';
import { ListItemIcon, makeStyles, Typography, } from '@material-ui/core';
import { LocalShipping, Person, ContactSupport as ContactSupportIcon } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import History from '../../../../../@history';
import { logoIcon } from '../../../../../assets';
import InfoIcon from '@material-ui/icons/Info';
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
    },
    profile: {
      background: theme.palette.primary.light,
      color: theme.palette.common.white,
      textTransform: 'capitalize',
      marginTop: 0,
      width: 250,
      '&:hover': {
        background: theme.palette.primary.light
      }

    },
    menu: {
      transform: 'translate(-30px, 40px)',
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
      <Button variant="outlined" color="primary" startIcon={/* user.picture */ true ? <img className={classes.profileicon} src={logoIcon} alt="profile"/>:<Person color="primary"/>} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} size="small">
        <span className={classes.text}>{user.name}</span>
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        className={classes.menu}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem className={classes.profile} onClick={() => History.push("/profile")}>
        <ListItemIcon>
        {user.picture && <img className={classes.profilepic} src={logoIcon} alt="profile"/>}
                {!user.picture && <Person className={classes.profilepic}/>}
          </ListItemIcon>
                
            <Typography>{user.name}</Typography>
        </MenuItem>
        <MenuItem onClick={() => History.push("/myorders")}>
          <ListItemIcon>
            <LocalShipping color="primary"/>
          </ListItemIcon>
          <Typography>My orders</Typography>
        </MenuItem>
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
          <ContactSupportIcon color="primary" />
          </ListItemIcon>
          <Typography>Contact</Typography>
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
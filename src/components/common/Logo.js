import { makeStyles } from '@material-ui/core';
import React from 'react';
import History from '../../@history';
import { logoIcon, LogoTextLighr } from '../../assets';
const useStyles=makeStyles(theme => ({
  root: {
    cursor: 'pointer'
  },
  img: {
    height: 50,
    marginTop: '7px !important',
    [theme.breakpoints.down("md")]: {
      height: 40,
    }
  }
}))
const Logo = ({size, logo, ...props}) => {
  const cls = useStyles();
  return (<div className={cls.root}>
    <img
      alt="Logo"
      src={logo || LogoTextLighr}
      className={size ||cls.img}
      onClick={()=> History.push("/")}
      {...props}
    />
    </div>
  );
};

export default Logo;

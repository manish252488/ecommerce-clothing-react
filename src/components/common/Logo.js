import { makeStyles } from '@material-ui/core';
import React from 'react';
import History from '../../@history';
import { LogoTextLighr } from '../../assets';
const useStyles=makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    height: 50,
    marginLeft: 10,
    marginTop: '7px !important',
    [theme.breakpoints.down("md")]: {
      height: 40,
    }
  }
}))
const Logo = ({size, logo, ...props}) => {
  const cls = useStyles();
  return (<div className={cls.root}>
   {/*  <HomeOutlined color="primary" onClick={()=> History.push("/")} fontSize="340"/> */}
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

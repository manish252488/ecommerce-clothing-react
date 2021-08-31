import { makeStyles } from '@material-ui/core';
import React from 'react';
import History from '../../@history';
import {Logo as logo} from '../../assets'
const useStyles=makeStyles({
  root: {
    width: 100,
  }
})
const Logo = (props) => {
  const cls = useStyles();
  return (
    <img
      alt="Logo"
      src={logo}
      className={props.size||cls.root}
      onClick={()=> History.push("/")}
      {...props}
    />
  );
};

export default Logo;

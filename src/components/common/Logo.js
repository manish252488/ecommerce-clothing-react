import { makeStyles } from '@material-ui/core';
import React from 'react';
import History from '../../@history';
const useStyles=makeStyles({
  root: {
    width: 100,
    cursor: 'pointer'
  }
})
const Logo = (props) => {
  const cls = useStyles();
  return (
    <img
      alt="Logo"
      src={'/assets/images/logo-dark.svg'}
      className={props.size||cls.root}
      onClick={()=> History.push("/")}
      {...props}
    />
  );
};

export default Logo;

import { makeStyles } from '@material-ui/core';
import React from 'react';
import History from '../../@history';
const useStyles=makeStyles({
  root: {
    cursor: 'pointer'
  },
  img: {
    height: 50
  }
})
const Logo = (props) => {
  const cls = useStyles();
  return (<div className={cls.root}>
    <img
      alt="Logo"
      src={'/assets/images/logo-dark.svg'}
      className={props.size||cls.img}
      onClick={()=> History.push("/")}
      {...props}
    />
    </div>
  );
};

export default Logo;

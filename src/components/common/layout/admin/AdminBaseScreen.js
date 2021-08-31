import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { checkJWT } from '../../../../store/actions';
import { useDispatch } from 'react-redux';
import History from '../../../../@history';
import '../index.less'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    paddingTop: '64px',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const AdminBaseScreen = (props) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
 
 const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(checkJWT(null,onFailure))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const onFailure = () => {
    History.push("/login")
  }
  return (
    <div className={classes.root}>
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
         <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {props?.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBaseScreen;

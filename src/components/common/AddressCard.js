import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActions, Chip, Grid, IconButton } from '@material-ui/core';
import { CreateOutlined, DeleteForever } from '@material-ui/icons';
import Auth from '../../api/auth';
import { useDispatch } from 'react-redux';
import { checkJWT, showMessageBar } from '../../store/actions';
import AlertDialogs from './AlertDialogs'
export default function AddressCard({data, setDefaultAdd, width, selectEditAddress}) {
  const dispatch =  useDispatch()
  const useStyles = makeStyles(theme => ({
    root: {
      minWidth: width ? width : 200,
      maxWidth: 200,
      cursor: 'pointer',
      [theme.breakpoints.down('md')]:{
        minWidth: '100%',
        maxWidth: "100%"
      }
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 12,
      fontWeight: 'bold',
      flexGrow:1
    },
    pos: {
      marginBottom: 12,
      marginTop: 10,
      fontSize: 12
    },
    flexEnd:{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    content:{
      paddingBottom: 0
    },
    action: {
      justifyContent: 'flex-end'
    }
  }));
  const classes = useStyles();
  const isFunction = typeof setDefaultAdd === 'function' 
  const [open, setOpen] = useState(false)
  const setDefault = id => {
    setDefaultAdd(id)
  }
  const deleteAddressFunction = (id) =>{
    Auth.deleteAddress(id).then(res => {
      dispatch(checkJWT())
      dispatch(showMessageBar('success', res.message))
    }).catch(err => {
      dispatch(showMessageBar('error', err.message))
    })
  }
  const agree = (val) => {
    if(val){
      deleteAddressFunction(data.id)
    }
    setOpen(false)
  }
  return (
    <Card className={classes.root} style={data?.default?{background: "#ffeecc"}: null} variant="outlined" >
      <CardContent className={classes.content}>
     
          <Grid container  alignItems="center">
              <Grid item xs={7}>
              <Typography className={classes.title} color="primary" gutterBottom>
          {data?.type || 'NA'}
        </Typography>
              </Grid>
              <Grid item xs={5} className={classes.flexEnd}>
              {!data?.default &&  <Chip size="small" color="default" variant="outlined" label="Set Default" clickable onClick={() =>isFunction ? setDefault(data.id): null}/>}
             {isFunction && <IconButton size="small" onClick={() => selectEditAddress(data)}><CreateOutlined fontSize="small"/> </IconButton>}
              </Grid>
          </Grid>
          {(data?.default && isFunction)? <Chip size="small" color="primary" label="Default"/>: ''}
        <Typography className={classes.pos} color="subtittle1">
          {data?.address1},{data?.address2},{data?.city}-{data?.pincode},{data?.state}-{data?.country}<br/>
          { data?.landmark }
        </Typography>
        <Typography className={classes.pos} color="primary">
          {data?.name}, {data?.phoneno}
        </Typography>
        {isFunction && <CardActions className={classes.action}>
          <IconButton onClick={() => setOpen(true)}><DeleteForever size={10}/></IconButton>
        </CardActions>}
      </CardContent>
      <AlertDialogs open={open} message="Are you sure you want to delete?" aggree={agree}></AlertDialogs>
    </Card>
  );
}
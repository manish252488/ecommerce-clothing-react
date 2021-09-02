import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Chip, Grid, IconButton } from '@material-ui/core';
import { CreateOutlined } from '@material-ui/icons';



export default function AddressCard({data, setDefaultAdd, width}) {
  const useStyles = makeStyles({
    root: {
      minWidth: width ? width : 200,
      maxWidth: 200,
      cursor: 'pointer'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 12,
      fontWeight: 'bold'
    },
    pos: {
      marginBottom: 12,
      fontSize: 12
    },
  });
  const classes = useStyles();
  const isFunction = typeof setDefaultAdd === 'function' 
  const setDefault = id => {
    setDefaultAdd(id)
  }
  return (
    <Card className={classes.root} style={data?.default?{background: "#ffeecc"}: null} variant="outlined" onClick={() =>isFunction ? setDefault(data.id): null}>
      <CardContent>
     
          <Grid container  alignItems="center">
              <Grid item xs={10}>
              <Typography className={classes.title} color="primary" gutterBottom>
          {data?.type || 'NA'}
        </Typography>
              </Grid>
              <Grid item xs={2}>
             {isFunction && <IconButton size="small"><CreateOutlined fontSize="small"/> </IconButton>}
              </Grid>
          </Grid>
        
          {(data?.default && isFunction)? <Chip size="small" color="primary" label="Default"/>: ''}
        <Typography className={classes.pos} color="primary">
          {data?.address1},{data?.address2},{data?.city}-{data?.pincode},{data?.state}-{data?.country}<br/>
          { data?.landmark }
        </Typography>
        <Typography className={classes.pos} color="primary">
          {data?.name}, {data?.phoneno}
        </Typography>
      </CardContent>
    </Card>
  );
}
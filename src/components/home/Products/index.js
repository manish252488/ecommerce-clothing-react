import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {  Star } from '@material-ui/icons';
import { Chip } from '@material-ui/core';
import History from '../../../@history';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    minWidth: 200,
    cursor: 'pointer',
    [theme.breakpoints.down('md')]:{
      maxWidth: '49%',
      minWidth: '48%',
    }
  },
  media: {
    height: 0,
    backgroundPosition: 'inherit',
    paddingTop: '90%',
    transition: '0.5s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  muted: {
    fontSize: 14,
    color: '#333'
  },
  chip: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 10,
    width: 88,
    height: 22,
  }
}));

export default function Products({ data }) {
  const classes = useStyles();
  // const isAuth = useSelector(({ Auth }) => Auth.isAuthenticated)
  // const cacheName = 'favorites'
 /*  const [cookies, setCookie, removeCookie] = useCookies([cacheName]);
  const setFav = () => {
    if(isAuth){
      // set to database
    } else {
      // set to session
      setCookie(cacheName, [data?._id || data?.id])
    }
  } */
  const setFav = () => {}
  return (
    <Card className={classes.root} >
      <CardContent onClick={() => History.push(`/product-detail/${data?.id || data?._id}`)}>
      <CardMedia
        className={classes.media}
        image={data.pictures[0]}
        title={data.name}
      />
        <Typography variant="h6" color="primary">
          {data?.name}
        </Typography>
        <Typography variant="body1" color="primary">{
          data.brand.name
        } {data?.designer ? 'by @' + data.designer : ''}</Typography>
        <Typography variant="h6" className={classes.bold}>₹ {data.sellingCost}&nbsp;
          <del className={classes.muted}>₹ {data.cost}</del>
          </Typography>
      </CardContent>
      <CardActions>
          <IconButton aria-label="Add to FAV" onClick={setFav}>
              <Star className={true? "start-active": "start-in"}  />
          </IconButton>
        {data.stock > 0 && <Chip
            className={classes.chip}
            color="primary"
            label="In Stock"
          />}
          {data.stock <= 0 && <Chip
            className={classes.chip}
            label="Stock Out"
          />}
        {/* 
        <Button startIcon={<FlashOnIcon color="inherit" />} variant="contained" color="primary" size="small">Buy Now</Button> */}
      </CardActions>
    </Card>
  );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Chip } from '@material-ui/core';
import History from '../../../@history';
import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '20%',
    margin: 1,
    height: '50vh',
    cursor: 'pointer',
    [theme.breakpoints.down("1000")]:{
      width: '25%',
      height: '45vh'
    },
    [theme.breakpoints.down("700")]:{
      width: '32%',
      height: '45vh'
    },
    [theme.breakpoints.down("500")]:{
      width: '49%',
      height: '40vh'
    },

  },
  media: {
    height: 0,
    backgroundPosition: 'center',
    transition: '0.5s',
    paddingTop: '95%',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)'
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
    width: 100,
    height: 22,
    [theme.breakpoints.up("1000")]:{
      marginLeft: 15
    },
  },
  container: {
    minHeight: 60
  },
  disabled: {
    opacity: 0.4,
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
 /*  const setFav = () => {} */
 console.log(data)
  if(!data){
    return null
  }
  return (
    <Card className={clsx(classes.root, data.stock <= 0 ? classes.disabled: null)} >
     
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
       
          {/* <IconButton aria-label="Add to FAV" onClick={setFav}>
              <Star className={true? "start-active": "start-in"}  />
          </IconButton> */}
         <Typography variant="h6" className={classes.bold}>₹ {data.sellingCost}&nbsp;
          <del className={classes.muted}>₹ {data.cost}</del>
          {data.stock > 0 && <Chip
            className={classes.chip}
            color="primary"
            label="In Stock"
          />}
          {data.stock <= 0 && <Chip
            className={classes.chip}
            label="Stock Out"
            color="primary"
          />}
          
          </Typography>
      </CardContent>
    </Card>
  );
}
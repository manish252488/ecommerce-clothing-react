import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import RatingComponent from './components/Rating';
import { ShoppingCartRounded } from '@material-ui/icons';
import { Button, Chip } from '@material-ui/core';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import CustomTooltip from '../../common/CustomTooltip';
import History from '../../../@history';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../store/actions'
import { getImage } from '../../../config/Utils';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    minWidth: 250,
    cursor: 'pointer'
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
  const classes = useStyles();/* 
  const [expanded, setExpanded] = React.useState(false); */

  /*  const handleExpandClick = () => {
     setExpanded(!expanded);
   }; */
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);
  const cart = useSelector(({ Auth }) => Auth.cart)
  const isAuth = useSelector(({ Auth }) => Auth.isAuthenticated)
  const addToCart = id => {
    setLoading(id)
    dispatch(Actions.addToCart(id, () => setLoading(null)))
  }
  const removeCart = id => {
    setLoading(id)
    dispatch(Actions.removeFromCart(id, () => setLoading(null)))
  }

  return (
    <Card className={classes.root} >
     
      <CardContent onClick={() => History.push(`/product-detail/${data.id}`)}>
      <CardMedia
        className={classes.media}
        image={getImage(data.pictures[0],'products')}
        title={data.brand}
      />
        <Typography variant="h5" color="primary">
          {data?.name}
        </Typography>
        <Typography variant="h6" color="primary">{
          data?.brand 
        } by @{data?.designer}</Typography>
        <RatingComponent value={2} />
        <Typography variant="h6" className={classes.bold}>₹ {data.sellingCost}&nbsp;
          <del className={classes.muted}>₹ {data.cost}</del>
          </Typography>
      </CardContent>
      <CardActions>
          {isAuth && <IconButton aria-label="add to cart" onClick={() => cart.find(val => val.product === data.id)? removeCart(data.id) : addToCart(data.id)}>
              <ShoppingCartRounded color={cart.find(val => val.product === data.id)? "primary": "inherit"}  />
          </IconButton>}
        <IconButton aria-label="share">
          <ShareIcon />
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
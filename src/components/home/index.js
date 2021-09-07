import React, { useEffect } from "react";
import "./index.less";
import AppBaseScreen from "../common/layout/user/AppBaseScreen";
import { Button, Card, Link, CardContent, CardHeader, Container, Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import Products from "./Products";
import CustomCarousel from "../common/corousels/CustomCarousel";
import { Pagination } from "@material-ui/lab";
import * as Actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { loginPage } from "../../assets";
import { ArrowDown } from "react-feather";
import * as Scroll from 'react-scroll';
const Events    = Scroll.Events;
const scroll    = Scroll.animateScroll;
const scrollSpy = Scroll.scrollSpy;
const useStyles = makeStyles({
  divider: {
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5
  },
  pagination: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center'
  }
})
const Home = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector(({ products }) => products.products)
  const isAuth = useSelector(({ Auth }) => Auth.isAuthenticated)
  useEffect(() => {
    Events.scrollEvent.register('begin', function(to, element) {
      console.log('begin', arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
      console.log('end', arguments);
    });

    scrollSpy.update();
   
  }, [])
  useEffect(() => {
    dispatch(Actions.listProducts())
    if (isAuth) {
      dispatch(Actions.listCart())
      dispatch(Actions.listOrders())
    }
  }, [])
  const loadMore = () => {
    console.log('loadMore')
  }

  return (
    <AppBaseScreen >
      <CustomCarousel images={[loginPage]} autoPlay={false} />
      <Container maxWidth="lg" className="scroll-container">
        <Card component={Paper}>
          <CardHeader
            action={<Button startIcon={<FilterListIcon />}>Filter</Button>}
            avatar={<Typography variant="h5"></Typography>}
          >
          </CardHeader>
          <Divider className={classes.divider} />
          {(products && products.length > 0) && <CardContent className="product-container">
            {products?.map((val, index) => (
              <Products key={index} data={val} />
            ))}
          </CardContent>}
          {
            (!products || products.length <= 0) && <div className="no-data">
              No Items Available!
            </div>
          }
        </Card>
        <div className={classes.pagination}>
          <Link onClick={loadMore} style={{ display: 'flex' }}><ArrowDown /> Load More</Link>
          {/*  <Pagination count={20} variant="outlined" shape="rounded" />
        */} </div>
      </Container>
    </AppBaseScreen>
  );
};
export default Home;

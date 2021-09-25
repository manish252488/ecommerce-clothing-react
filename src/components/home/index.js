import React, { useEffect, useState } from "react";
import "./index.less";
import AppBaseScreen from "../common/layout/user/AppBaseScreen";
import { Button, Card, Container, Divider, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import CustomCarousel from "../common/corousels/CustomCarousel";
import { useDispatch, useSelector } from "react-redux";
import { loginPage } from "../../assets";
import LoadingScreen from "../common/Loader.js";
import { checkJWT, clearProducts, getCategories, getOffers, listProducts, showMessageBar } from "../../store/actions";
import CategoryCard from "../common/categorycard";
import OfferCard from "../common/offerCard";
import ProductsCard from "../Products/Products"
import ProductsApi from "../../api/products";
import History from "../../@history";

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
  },
  next:{
    height: '100%',
    justifySelf: 'flex-end'
  }
})
const Home = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector(({ products }) => products.categories)
  const recentviews = useSelector(({ Auth }) => Auth.user?.recentviews || [])
  const products = useSelector(({products}) => products.products)
  const offers = useSelector(({ offers }) => offers.offers)
  const banners = offers?.map(val => val.picture)
  const [productViewed, setProductviewed] = useState([])
  useEffect(() => {
    dispatch(checkJWT())
    dispatch(clearProducts())
    dispatch(getCategories())
    dispatch(getOffers())
    dispatch(listProducts({perPage:5, page: 1}))
    getRecentViews()

  }, [])
  console.log(productViewed, '------------------')
  const getRecentViews = () => {
    ProductsApi.getProducts(recentviews).then(
      res => {
        setProductviewed(res.data)
      }
    ).catch(err =>{
      dispatch(showMessageBar("error", err.message))
    })
  }
  if (!categories  || !recentviews || !products || !offers) {
    return <LoadingScreen />
  }
  return (<AppBaseScreen>

    <Container maxWidth="lg" className="scroll-container">
      <CustomCarousel autoPlay={true} images={[...banners]} width="100%" />
      <Container>
        <br />
        <br />
        <Typography variant="h5">New Offers</Typography>

        <Divider />

        <Grid className={classes.justifyContent} container wrap={true}>
          {
            offers?.map((value, index) => <OfferCard key={index} data={value} />)
          }
        </Grid>
        <br />
        <br />
        <br />
        <Typography variant="h5">New Arrivals</Typography>

        <Divider />

        <Grid className={classes.justifyContent} container wrap={true}>
          {
            products?.slice(0,4).map((value, index) => <ProductsCard key={index} data={value} />)
          }
          <Grid item xs={2}>
            <Button color="primary" onClick={() => History.push("/products")} className={classes.next} variant="contained" size="large">View More</Button>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <Typography variant="h5">Top Categories</Typography>

        <Divider />

        <Grid className={classes.justifyContent} container>
          {
            categories?.map((value, index) => <CategoryCard key={index} data={value} />)
          }
        </Grid>
        <br /><br /><br />
        <Typography variant="h5">All Categories</Typography>

        <Divider />

        <Grid className={classes.justifyContent} container>
          {
            categories?.map((value, index) => <CategoryCard key={index} data={value} />)
          }
        </Grid>
        <br /><br /><br />
        <Typography variant="h5">Recently Viewed {">"} </Typography>

        <Divider />

        <Grid className={classes.justifyContent} container>
          {
            productViewed?.length <= 0 && <div className="no-banner">
              Back the amazing gift voucher and discounts upto 50%. start shopping today
            </div>
          }
          {
            productViewed?.map((value, index) => <ProductsCard key={index} data={value} />)
          }
        </Grid>
        <br /><br /><br />
      </Container>
    </Container>
  </AppBaseScreen>

  );

};
export default Home;

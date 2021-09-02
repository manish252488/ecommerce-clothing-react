import React, { useEffect } from "react";
import "./index.less";
import AppBaseScreen from "../common/layout/user/AppBaseScreen";
import { Button, Card, CardContent, CardHeader, Container, Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import Products from "./Products";
import CustomCarousel from "../common/corousels/CustomCarousel";
import { Pagination } from "@material-ui/lab";
import * as Actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { loginPage } from "../../assets";
const useStyles = makeStyles({
  divider: {
    marginBottom: 5,
    marginTop:5,
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
  const dispatch = useDispatch()
  const products = useSelector(({products}) => products.products)
  useEffect(()=> {
    dispatch(Actions.listProducts())
  },[dispatch])
  return (
    <AppBaseScreen>
      <CustomCarousel images={[loginPage]} autoPlay={false}/>
      <Container maxWidth="lg" className="scroll-container">
      <Card component={Paper}>
        <CardHeader
        action={<Button startIcon={<FilterListIcon />}>Filter</Button>}
        avatar={<Typography variant="h5"></Typography>}
        >
        </CardHeader>
        <Divider className={classes.divider}/>
        {products.length > 0 && <CardContent className="product-container">
         {products?.map((val, index) => (
           <Products key={index} data={val}/>
         ))} 
        </CardContent>}
        {
          products.length <= 0 && <div className="no-data">
            No Items Available!
          </div>
        }
      </Card>
      <div className={classes.pagination}>
      <Pagination  count={20} variant="outlined" shape="rounded" />
      </div>
      </Container>
    </AppBaseScreen>
  );
};
export default Home;

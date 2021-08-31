import React from "react";
import "./index.less";
import AppBaseScreen from "../common/layout/user/AppBaseScreen";
import ChatBot from "../ChatBot";
import { Button, Card, CardContent, CardHeader, Container, Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import Products from "./Products";
import CustomCarousel from "../common/corousels/CustomCarousel";
import { Pagination } from "@material-ui/lab";
const useStyles = makeStyles({
  scrollContainer: {
    marginTop: 30
  },
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
  return (
    <AppBaseScreen>
      <ChatBot />
      <CustomCarousel autoPlay={false}/>
      <Container maxWidth="lg" className={classes.scrollContainer}>
      
      <Card component={Paper}>
        <CardHeader
        action={<Button startIcon={<FilterListIcon />}>Filter</Button>}
        avatar={<Typography variant="h5">Our Products</Typography>}
        >
        </CardHeader>
        <Divider className={classes.divider}/>
        <CardContent className="product-container">
         {Array(8).fill(1).map((val, index) => (
           <Products key={index}/>
         ))} 
        </CardContent>
      </Card>
      <Container maxWidth="lg" className={classes.pagination}>
      <Pagination count={10} variant="outlined" shape="rounded" />
      </Container>
      </Container>
    </AppBaseScreen>
  );
};
export default Home;

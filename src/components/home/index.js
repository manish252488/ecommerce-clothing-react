import React from "react";
import "./index.less";
import AppBaseScreen from "../common/layout/user/AppBaseScreen";
import ChatBot from "../ChatBot";
import { Button, Card, CardContent, CardHeader, makeStyles, MenuItem, MenuList, Paper } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import Products from "./Products";
const useStyles = makeStyles({
  scrollContainer: {
    width: '100%',
    height: 525,
  }
})
const Home = (props) => {
  const classes = useStyles();
  return (
    <AppBaseScreen>
      <ChatBot />
      <Card component={Paper} className={classes.scrollContainer}>
        <CardHeader
        action={<Button startIcon={<FilterListIcon />}>Filter</Button>}
        >
        </CardHeader>
        <CardContent className="product-container">
         {Array(10).fill(1).map((val, index) => (
           <Products key={index}/>
         ))} 
        </CardContent>
      </Card>
    </AppBaseScreen>
  );
};
export default Home;

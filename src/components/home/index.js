import React, { useCallback, useEffect, useRef, useState } from "react";
import "./index.less";
import AppBaseScreen from "../common/layout/user/AppBaseScreen";
import { Card, Link, CardContent, CardHeader, Container, Divider, makeStyles, Paper } from "@material-ui/core";
import Products from "./Products";
import CustomCarousel from "../common/corousels/CustomCarousel";
import * as Actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { loginPage } from "../../assets";
import { ArrowDown } from "react-feather";
import LoadingScreen from "../common/Loader.js";
import { renderIfElse } from "../../config/Utils";
import Carousel from "nuka-carousel";

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
  const isAuth = useSelector(({ Auth }) => Auth.isAuthenticated)
  const products = useSelector(({products}) => products.products)
  const maxPage = useSelector(({products}) => products?.metadata?.maxPageSize || 0)
  const [page, setPage] = useState(1);
  const [perPage,] = useState(10)
  const observer = useRef()
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(Actions.clearProducts())
    if(isAuth) {
      dispatch(Actions.listCart())
      dispatch(Actions.getCategories())
    }
   // eslint-disable-next-line
  }, [dispatch])
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    })
    if (node) observer.current.observe(node)
    // eslint-disable-next-line
  }, [loading])
  useEffect(() => {
    setLoading(true)
    dispatch(Actions.listProducts({perPage: perPage, page: page, onSuccess: () => setLoading(() => false)}))
  //eslint-disable-next-line
  }, [page])
  const loadMore = () => {
    if(page + 1 <= maxPage){
      setPage((prev) => prev + 1)
    }
  }
  if(!products || products.length <= 0) {
    return <LoadingScreen/>
  }
  return(<AppBaseScreen>
    
      <Container maxWidth="lg" className="scroll-container">
        <CustomCarousel autoPlay={true} images={[loginPage]} width="100%" />
        <Card component={Paper}>
          <Divider className={classes.divider} />
          {(products && products.length > 0) && <CardContent className="product-container">
            {products?.map((val, index) => (
                <Products key={index} data={val} />
            ))}
          </CardContent>}
          {page+1 <= maxPage && <div className={classes.pagination}>
            <Link onClick={loadMore} ref={lastBookElementRef} style={{ display: 'flex' }}><ArrowDown /> Load More</Link>
           </div>}
           {page+1 > maxPage && <div className={classes.pagination}>
            <Link style={{ display: 'flex' }}>No More Products!</Link>
           </div>}
        </Card>

      </Container>
      </AppBaseScreen>
 
  );
 
};
export default Home;

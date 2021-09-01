import { Button, Card, CardHeader, Chip, Container, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductsApi from '../../api/products';
import { shuffle } from '../../config/Utils';
import { listProducts } from '../../store/actions';
import CustomCarousel from '../common/corousels/CustomCarousel';
import AppBaseScreen from '../common/layout/user/AppBaseScreen';
import Products from '../home/Products';
import RatingComponent from '../home/Products/components/Rating';
import './index.less'
const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 80,
    },
    card: {
        width: '100%',
    },
    frame: {
        background: '#333',
        margin: theme.spacing(1),
        maxWidth: '100%',
        overflow: 'hidden',
    },
    container: {
        padding: 10,
        overflowY: 'auto'
    },
    description: {
        padding: 20
    },
    boxContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    colorbox: {
        width: 50,
        height: 50,
        border: '3px solid #ddd',
        padding: 1,
        cursor: 'pointer',
        margin: 5
    },
    similiarProducts: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        width: '100%',
        columnGap: 25,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center'
    }
}))
export default function ProductDetails(props){
    const classes = useStyles()
    const { productId } = useParams();
    const [product, setProduct] = useState(null)
    const dispatch = useDispatch();
    const products = useSelector(({products}) => products.products)
    useEffect(() => {
        dispatch(listProducts())
        ProductsApi.productDetail(productId).then(res => {
            setProduct(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [productId, dispatch])
    if(!product) {
        return null
    }
    return <AppBaseScreen>
        <Container maxWidth="lg" className={classes.root}>
            <Card className={classes.card}>
                <Grid container xs={12}>
                    <Grid item xs={6}>
                        <div className={classes.frame}>
                             <CustomCarousel images={product.pictures} autoPlay={false}/>
                        </div>
                        <div className="btn-container">
                        <Button variant="contained" color="primary">Add to Cart</Button>
                        <Button variant="contained" color="primary">Buy Now</Button>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Container maxWidth="lg" className={classes.container}>
                        <Typography variant="body2">
                        {product.stock > 0 && <Chip
                            className={classes.chip}
                            color="primary"
                            label="In Stock"
                        />}
                        {product.stock <= 0 && <Chip
                        className={classes.chip}
                        label="Stock Out"
                    />}&nbsp;&nbsp;
                    #{product.id} </Typography>
                        <Typography variant="h3">
                            {product.name} - {product.brand}
                        </Typography>
                        <Typography variant="h5">₹ {product.sellingCost} <del style={{color: '#333', fontSize: 16}}>₹ {product.cost}</del></Typography>
                        <Divider />
                        <div className={classes.description}>
                            <Typography variant="h6">Ratings:</Typography>
                        <RatingComponent value={product.rating} />
                        <Typography variant="body2">
                            {product.description}
                        </Typography>
                        </div>
                        <Typography variant={'h6'}>
                            Available Colours
                        </Typography>
                        <Divider />
                        <div className={classes.description}>
                            <div className={classes.boxContainer}>
                        {product.colorOptions.map(val => <div className={classes.colorbox} style={{background: val }}></div>)}
                        </div>
                        </div>
                        <Typography variant={'h6'}>
                            Material
                        </Typography>
                        <Divider />
                        <div className={classes.description}>
                        {product.material.map(val => (<Chip
                            className={classes.chip}
                            style={{marginLeft: 5}}
                            color="primary"
                            label={val}
                        />))}
                        </div>
                        <Typography variant={'h6'}>
                            Available In
                        </Typography>
                        <Divider />
                        <div className={classes.description}>
                        <Button variant="outlined" color="primary">Filpkart</Button> &nbsp;
                        <Button variant="outlined" color="primary">Amazon</Button> &nbsp;
                        <Button variant="outlined" color="primary">Meesho</Button> &nbsp;
                        </div>
                        </Container>
                    </Grid>
                </Grid>
            </Card>
            <div className={classes.description}>
                
            </div>
            <Card component={Paper} >
                <CardHeader title="Similiar Products"></CardHeader>
                <Divider/>
                <div className={classes.similiarProducts}>
                {
                    shuffle(products).slice(0, 4).map((val, index) => (
                        <Products key={index} data={val}/>
                      ))
                } 
                </div>
            </Card>
        </Container>
    </AppBaseScreen>
}
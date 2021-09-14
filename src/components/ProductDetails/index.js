import { Button, Card, CardHeader, Chip, CircularProgress, Container, Divider, Grid, Link, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { FlashOn, Person, ShoppingCart } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import History from '../../@history';
import ProductsApi from '../../api/products';
import { shuffle } from '../../config/Utils';
import { listCart, showMessageBar } from '../../store/actions';
import CustomCarousel from '../common/corousels/CustomCarousel';
import AppBaseScreen from '../common/layout/user/AppBaseScreen';
import Products from '../home/Products';
import RatingComponent from '../home/Products/components/Rating';
import './index.less'
import * as Actions from '../../store/actions'
import LoadingScreen from '../common/Loader.js';
import ReviewApi from '../../api/reviews';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {

    },
    card: {
        width: '100%',
    },
    frame: {
        background: '#333',
        margin: theme.spacing(1),
        maxWidth: '80%',
        overflow: 'hidden',
        marginLeft: 30,
        marginTop: 30,
        borderRadius: 5,
        border: '2px solid #333'
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
        width: 40,
        height: 40,
        border: '3px solid #ddd',
        padding: 1,
        cursor: 'pointer',
        margin: 5,
        fontSize: 15,
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center'
    },
    similiarProducts: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        width: '100%',
        columnGap: 15,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        [theme.breakpoints.down("md")]: {
            columnGap: 1,
        }
    },
    logo: {
        width: 75
    },
    chip: {
        marginLeft: 20,
        marginTop: 15,
    }
}))
export default function ProductDetails(props) {
    const classes = useStyles()
    const [cartLoading, setCartLoading] = useState(false)
    const { productId } = useParams();
    const cart = useSelector(({ Auth }) => Auth.cart.cart || [])
    const isAuth = useSelector(({ Auth }) => Auth.isAuthenticated || false)
    const [product, setProduct] = useState(null)
    const dispatch = useDispatch();
    const products = useSelector(({ products }) => products.products)
    const [data, setData] = useState(product?.sizes[0] || null)
    const [size, setSize] = useState(product?.colorOptions[0] || "")
    const [color, setColor] = useState("")
    const [buynowLoading, setbuyLoading] = useState(false)
    const [error, setErrors] = useState({
        size: {
            message: ''
        },
        color: {
            message: ''
        }
    })
    const [review, setReview] = useState("")
    const [productReview, setProductReviews] = useState([])
    const [reviewLoading,setReviewLoading] = useState()
    useEffect(() => {
        if (isAuth) {
            dispatch(listCart())
        }
        ProductsApi.productDetail(productId).then(res => {
            if (res.data) {
                setProduct(res.data.product)
                getProductReviews(res.data.product.id)
                setColor(res.data.product.colorOptions[0])
                setSize(res.data.product.sizes[0])
                setData(res.data)
            } else {
                dispatch(showMessageBar('error', res.message))
            }
        }).catch(err => {
            dispatch(showMessageBar('error', err.message))
        })
    }, [])

    useEffect(() => {
        if (size && size !== "") {
            setErrors({ ...error, size: { message: '' } })
        }
        if (product && product.colorOptions.length > 0) {
            if (color && color !== "") {
                setErrors({ ...error, color: { message: '' } })
            }
        }
        // eslint-disable-next-line 
    }, [color, size])

    const getProductReviews = (id) => {
        ReviewApi.getProductReviews(id).then(res => {
            setProductReviews(res.data)
        }).catch(err => dispatch(showMessageBar('error', err.message)))
    }
    const addToCart = (id, buynow = false) => {
        if (!isAuth) {
            History.push("/login")
            return;
        }
        if (!buynow) setCartLoading(true)
        let flag = true
        let errors = {
            size: {
                message: ''
            },
            color: {
                message: ''
            }
        }
        if (!size || size === "") {
            errors.size.message = 'Select one size!'
            flag = false
        }
        if (product.colorOptions.length > 0) {
            if (!color || color === "") {
                errors.color.message = 'Select one !'
                flag = false
            }
        }
        setErrors({ ...error, ...errors })
        if (!flag) {
            setCartLoading(false)
            return;
        }
        const data = {
            productId: id,
            color: color,
            size: size
        }
        dispatch(Actions.addToCart(data, () => {
            setCartLoading(false)
            if (buynow) {
                setbuyLoading(false)
                History.push("/cart")
            }
        }, (mes) => {
            setCartLoading(false)
            dispatch(showMessageBar('error', mes))
        }))
    }
    const removeFromCart = (id) => {
        setCartLoading(id)
        dispatch(Actions.removeFromCart(id, () => setCartLoading(null), (mes) => {
            dispatch(showMessageBar('error', mes))
        }))
    }
    const buyNow = (id) => {
        setbuyLoading(true)
        if (cart?.find(v => v.product === product.id)) {
            setbuyLoading(false)
            History.push("/cart")
        } else {
            addToCart(id, true)
        }
    }
    const postReview = () => {
        if (review && review !== "") {
            setReviewLoading(true)
            ReviewApi.postReview({ productId: product.id, review: review }).then(res => {
                getProductReviews(productId)
                setReviewLoading(false)
                setReview("")
            }).catch(err => {
                setReviewLoading(false)
                dispatch(showMessageBar('error', err.message))
            })
        }

    }
    if (!products || products.length <= 0 || !data) {
        return <LoadingScreen ></LoadingScreen>
    }
    return (<AppBaseScreen>
        <Container maxWidth="lg" className={classes.root + ' container'}>
            <Card className={classes.card}>
                <Grid container>
                    <Grid item xs={6}>
                        <div className={classes.frame}>
                            <CustomCarousel images={product?.pictures} autoPlay={false} />
                        </div>

                    </Grid>
                    <Grid item xs={6}>
                        <Container maxWidth="lg" className={classes.container}>

                            <Typography variant="body2">
                                #{data?.category.name}
                                &nbsp;&nbsp;</Typography>

                            <Typography variant="h5">
                                {product?.name} - {data?.brand.name}
                            </Typography>
                            <Typography variant="h5">₹ {product?.sellingCost} <del style={{ color: '#333', fontSize: 16 }}>₹ {product?.cost}</del></Typography>
                            <RatingComponent value={product?.rating} />
                            <Divider />
                            {product?.stock > 0 && <Chip
                                className={classes.chip}
                                color="primary"
                                label="In Stock"
                            />}
                            {product?.stock <= 0 && <Chip
                                className={classes.chip}
                                label="Stock Out"
                            />}
                            <div className={classes.description}>

                                <Typography variant="body2">
                                    {product?.description}
                                </Typography>
                            </div>
                            <Typography variant={'h6'}>
                                Available Sizes <sup className="highlight">*</sup>{error.size.message ? <span className="highlight">{error.size.message}</span> : ''}
                            </Typography>
                            <Divider />
                            <div className={classes.description}>
                                <div className={classes.boxContainer}>
                                    {product.sizes.map((val, index) => <div key={index} className={classes.colorbox + (val === size ? " active" : '')} onClick={() => setSize(val)}>{val}</div>)}
                                </div>
                            </div>
                            <Typography variant={'h6'}>
                                Available Colours<sup className="highlight">*</sup> {error.color.message ? <span className="highlight">{error.color.message}</span> : ''}
                            </Typography>
                            <Divider />
                            <div className={classes.description}>
                                <div className={classes.boxContainer}>
                                    {product?.colorOptions.map((val, index) => <div key={index} className={classes.colorbox + (val === color ? " active" : '')} style={{ background: val }} onClick={() => setColor(val)}></div>)}
                                </div>
                            </div>
                            <Typography variant={'h6'}>
                                Material
                            </Typography>
                            <Divider />
                            <div className={classes.description}>
                                {product?.material?.map((val, key) => (<Chip
                                    key={key}
                                    className={classes.chip}
                                    style={{ marginLeft: 5 }}
                                    color="primary"
                                    label={val}
                                />))}
                            </div>
                            {/* <Typography variant={'h6'}>
                                Available In
                            </Typography>
                            <Divider />
                            <div className={classes.description}>
                                <Button variant="outlined" color="primary">Filpkart</Button> &nbsp;
                                <Button variant="outlined" color="primary">Amazon</Button> &nbsp;
                                <Button variant="outlined" color="primary">Meesho</Button> &nbsp;
                            </div> */}
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography variant={'h6'}>Brand</Typography>
                                    <Divider />
                                    <img src={data?.brand.logo} alt="logo" className={classes.logo} />
                                </Grid>
                                <Grid item xs={6}>

                                </Grid>
                            </Grid>
                            <Divider />
                            <div className="btn-container">
                                <Button
                                    disabled={product?.stock <= 0}
                                    startIcon={cartLoading ? <CircularProgress color="primary" size={20} /> : <ShoppingCart />}
                                    onClick={() => cart?.find(v => v.product === product.id) ? removeFromCart(product.id) : addToCart(product.id)}
                                    variant="contained" color={cart?.find(v => v.product === product.id) ? "primary" : "secondary"}>
                                    {cart?.find(v => v.product === product.id) ? "Remove Cart" : "Add to Cart"}
                                </Button>
                                <Button
                                    disabled={product?.stock <= 0}
                                    startIcon={buynowLoading ? <CircularProgress color="secondary" size={20} /> : <FlashOn color="secondary" />}
                                    variant="contained" onClick={() => buyNow(product.id)} color="primary">Buy Now</Button>
                            </div>
                        </Container>
                    </Grid>
                </Grid>
            </Card>
            <div className={classes.description}>

            </div>
            <Card component={Paper} >
                <CardHeader title="Similiar Products"></CardHeader>
                <Divider />
                <div className={classes.similiarProducts + ' similiar-products'}>
                    {
                        products.slice(0, 6).map((val, index) => (
                            <Products key={index} data={val} />
                        ))
                    }
                </div>
            </Card>
            <div className={classes.description}>
            </div>
            <Container className="reviewContainer" maxWidth="lg">
                <Typography variant={'h5'}>&nbsp;Reviews</Typography>
                <Link>{'<<'} previous</Link>
                <Divider />
                <List>
                    {
                        productReview?.map((val, index) => (
                            <ListItem key={index}>
                                <div className="flex">
                                    <ListItemIcon>
                                        <Person />
                                    </ListItemIcon>

                                    <Typography variant="h6">
                                        {val?.username} - {moment(val?.createdDate).fromNow()}
                                    </Typography>
                                </div>
                                <Typography className="message-con" variant="body2">
                                    {val?.review}
                                </Typography>
                            </ListItem>
                        ))
                    }
                    {(!productReview || productReview.length <= 0) &&
                        <ListItem>
                            <ListItemText style={{ textAlign: 'center' }}>No reviews yet!</ListItemText>
                        </ListItem>
                    }
                </List>
            </Container>
            <Container className="reviewContainer" maxWidth="lg">
                <Typography>Post an review:</Typography>
                <TextField
                value={review}
                    onChange={(ev) => setReview(ev.target.value)}
                    multiline style={{ width: '50%' }} minRows={4} variant="outlined" size="medium" maxRows={4}>
                </TextField>
                <Button variant="contained" color="primary" style={{minWidth: 180}} 
                onClick={postReview}>{reviewLoading? <CircularProgress size={15} color="secondary" />: "Submit"}</Button>
            </Container>
        </Container></AppBaseScreen>)

}
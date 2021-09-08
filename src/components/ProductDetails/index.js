import { Button, Card, CardHeader, Chip, CircularProgress, Container, Divider, Grid, Link, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { FlashAuto, FlashOn, Person, ShoppingCart } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import History from '../../@history';
import ProductsApi from '../../api/products';
import { shuffle } from '../../config/Utils';
import { listCart, listProducts } from '../../store/actions';
import CustomCarousel from '../common/corousels/CustomCarousel';
import AppBaseScreen from '../common/layout/user/AppBaseScreen';
import Products from '../home/Products';
import RatingComponent from '../home/Products/components/Rating';
import './index.less'
import * as Actions from '../../store/actions'
const useStyles = makeStyles(theme => ({
    root: {

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
        width: 40,
        height: 40,
        border: '3px solid #ddd',
        padding: 1,
        cursor: 'pointer',
        margin: 5,
        fontSize: 18,
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center'
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
    },
    logo: {
        width: 100
    }
}))
export default function ProductDetails(props) {
    const classes = useStyles()
    const [cartLoading, setCartLoading] = useState(false)
    const { productId } = useParams();
    const cart = useSelector(({ Auth }) => Auth.cart || [])
    const isAuth = useSelector(({ Auth }) => Auth.isAuthenticated || false)
    const [product, setProduct] = useState(null)
    const dispatch = useDispatch();
    const products = useSelector(({ products }) => products.products)
    const [data, setData] = useState(null)
    const [size, setSize] = useState("")
    const [color, setColor] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setErrors] = useState({
        size: {
            message: ''
        },
        color: {
            message: ''
        }
    })
    
    useEffect(() => {
        dispatch(listCart())
        ProductsApi.productDetail(productId).then(res => {
            setProduct(res.data.product)
            setData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [productId, dispatch])

    useEffect(()=> {
        if (size && size !== "") {
            setErrors({ ...error, size: { message: '' } })
        }
        if (product && product.colorOptions.length > 0) {
            if (color && color !== "") {
                setErrors({ ...error, color: { message: '' } })
            }
        }
    }, [color,size])
    const addToCart = (id) => {
        if(!isAuth) {
           History.push("/login")
           return;
        }
        setCartLoading(true)
        let flag = true

        if (!size || size === "") {
            setErrors({ ...error, size: { message: 'Select one size!' } })
            flag = false
        }
        if (product.colorOptions.length > 0) {
            if (!color || color === "") {
                setErrors({ ...error, color: { message: 'Select one !' } })
                flag = false
            }
        }
        if (!flag) {
            setCartLoading(false)
            return;
        }
        const data ={
            productId: id,
            color: color,
            size: size
        }
        dispatch(Actions.addToCart(data, () => setCartLoading(false), (mes) => {
            setCartLoading(false)
        }))
    }
    const removeFromCart = (id) => {
        setCartLoading(id)
        dispatch(Actions.removeFromCart(id, () => setCartLoading(null)))
    }
    if (!product) {
        return null
    }
    return <AppBaseScreen>
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
                            {product.stock > 0 && <Chip
                                className={classes.chip}
                                color="primary"
                                label="In Stock"
                            />}
                            {product?.stock <= 0 && <Chip
                                className={classes.chip}
                                label="Stock Out"
                            />}
                            <Typography variant="h5">
                                {product?.name} - {data?.brand.name}
                            </Typography>
                            <Typography variant="h5">₹ {product?.sellingCost} <del style={{ color: '#333', fontSize: 16 }}>₹ {product?.cost}</del></Typography>
                            <RatingComponent value={product?.rating} />
                            <Divider />
                            <div className={classes.description}>

                                <Typography variant="body2">
                                    {product.description}
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
                                    {product.colorOptions.map((val, index) => <div key={index} className={classes.colorbox + (val === color ? " active" : '')} style={{ background: val }} onClick={() => setColor(val)}></div>)}
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
                            <Typography variant={'h6'}>Brand</Typography>
                            <Divider />
                            <img src={data?.brand.logo} alt="logo" className={classes.logo} />
                            <Divider />
                            <div className="btn-container">
                                <Button
                                    startIcon={cartLoading ? <CircularProgress color="primary" size={20} /> : <ShoppingCart />}
                                    onClick={() => cart?.find(v => v.product === product.id) ? removeFromCart(product.id) : addToCart(product.id)}
                                    variant="contained" color={cart?.find(v => v.product === product.id) ? "primary" : "secondary"}>
                                    {cart?.find(v => v.product === product.id) ? "Remove Cart" : "Add to Cart"}
                                </Button>
                                <Button
                                    startIcon={<FlashOn />}
                                    variant="contained" color="primary">Buy Now</Button>
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
                        shuffle(products).slice(0, 5).map((val, index) => (
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
                        Array(10).fill(5).map((val, index) => (
                            <ListItem>
                                <div className="flex">
                                    <ListItemIcon>
                                        <Person />
                                    </ListItemIcon>

                                    <Typography variant="h6">
                                        Manish Singh
                                    </Typography>
                                </div>
                                <Typography className="message-con" variant="body2">
                                    Using review request text templates to ask for a Google review is not some sort of bad practice. Sure, you could depend on email review request templates, but texts can be incredibly effective.
                                </Typography>
                            </ListItem>
                        ))
                    }
                    {
                        <ListItem>
                            <ListItemText style={{ textAlign: 'center' }}>No reviews yet!</ListItemText>
                        </ListItem>
                    }
                </List>
            </Container>
            <Container className="reviewContainer" maxWidth="lg">
                <Typography>post an review:</Typography>
                <TextField multiline fillWidth minRows={4} variant="outlined" size="medium" maxRows={4}>

                </TextField>
                <Button variant="contained" color="primary" size="small">post</Button>
            </Container>
        </Container>
    </AppBaseScreen>
}
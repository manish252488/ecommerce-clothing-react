import { Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Container, Divider, Grid, IconButton, Link, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { ArrowRight, ShoppingBasket, Visibility } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { MinusCircle, PlusCircle, ShoppingBag } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import History from '../../@history'
import Auth from '../../api/auth'
import { getImage, renderIfElse } from '../../config/Utils'
import { listCart, addToCart as addCart, removeFromCart as removeCart, checkJWT, currentOrder } from '../../store/actions'
import AddressCard from '../common/AddressCard'
import AppBaseScreen from '../common/layout/user/AppBaseScreen'
import CountrySelect from '../common/CountrySelectField'
import './index.less'
import LoadingScreen from '../common/Loader.js'
import ResponsiveDialogs from '../common/ResponsiveDialogs'
import AddressUpdate from '../profile/components/AddressUpdate'

const useStyles = makeStyles({
    media: {
        height: 150,
        margin: 10,
        backgroundPosition: 'inherit',
        transition: '0.5s',
        cursor: 'pointer',
        border: '2px solid #ddd'
    },
})
export default function Payment(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const billingData = useSelector(({ Auth }) => Auth.billingData || {})
    const cart = useSelector(({ Auth }) => Auth.cart.cart)
    const savedAddress = useSelector(({ Auth }) => Auth.user.savedAddress || [])
    const products = useSelector(({ products }) => products.products || [])
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [loading, setLoading] = useState(false);
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [addCont,
        showAddContainer] = useState(false)
    const [errorFields, setErrorFields] = useState({
        address1: '',
        address2: '',
        state: '',
        pincode: '',
        city: '',
        country: '',
        landmark: '',
        name: '',
        type: '',
        phoneno: '',
    })
    const [addressForm, setAddressForm] = useState({
        address1: '',
        address2: '',
        state: '',
        pincode: '',
        city: '',
        country: '',
        landmark: '',
        name: '',
        phoneno: '',
        type: 'Home',
        default: false
    })
    useEffect(() => {
        dispatch(listCart())
    }, [dispatch])
    const addToCart = id => {
        const alldata = cart.find(val => val.product === id)
        const data = {
            productId: id,
            color: alldata.color,
            size: alldata.size,
        }
        dispatch(addCart(data))
    }
    const removeFromCart = id => {
        dispatch(removeCart(id))
    }
    const getProducts = () => {
        let productsAdded = []
        if (cart && cart.length > 0) {
            cart?.forEach(val => {
                const sample = products.find(c => c.id === val.product)
                if (sample) {
                    sample.quantity = cart.find(v => v.product === sample.id)?.quantity
                    sample.size = cart.find(v => v.product === sample.id)?.size;
                    sample.color = cart.find(v => v.product === sample.id)?.color;
                    sample.brand = productsAdded.push(sample)
                }
            })
        }
        return productsAdded;
    }
    const saveAddress = () => {
        if (validate()) {
            setLoading(true)
            Auth.addAddress(addressForm).then(res => {
                setLoading(false)
                dispatch(checkJWT())
                showAddContainer(false)
            }).catch(err => {
                setLoading(false)
            })
        }
    }
    const setdefaultAdd = (id) => {
        Auth.setDefaultAddress(id).then(res => {
            dispatch(checkJWT())
        }).catch(err => {
        })
    }
    const change = (key, ev) => {
        setAddressForm({ ...addressForm, [key]: ev.target.value })
    }
    const validate = () => {
        let flag = true
        let errors = {}
        let neglect = []
        for (const [key, value] of Object.entries(addressForm)) {
            if ((value === null || value === '') && !neglect.includes(key)) {
                flag = false
                errors[key] = "Cannot be Empty!"
            }
        }
        setErrorFields(errors)
        return flag
    }

    const createOrder = () => {
        const addedPro = []
        setLoadingOrder(true)
        cart.forEach(val => {
            let prod = products.find(v => v.id === val.product)
            delete val.product;
            delete val.id;
            delete val.userId;
            let data = {
                ...val,
                ...prod,
            }
            addedPro.push(data)
        })
        if (!validateOrder()) {
            return false
        }
        let data = {};
        data.products = addedPro;
        data.billingAddress = validateOrder()
        dispatch(currentOrder(data))
        History.push("/checkout");
    }
    const validateOrder = () => {
        if (savedAddress.find(v => v.default === true) && cart.length > 0) {
            return savedAddress.find(v => v.default === true)
        } else {
            return false
        }
    }
    if (!cart || !billingData ||
        !savedAddress ||
        !products) {
        return <LoadingScreen />
    }
    return (<AppBaseScreen>
        <Container maxWidth="lg" className="payment-container" >
            <Typography variant="h4" color="primary">  <ShoppingBag /> Cart</Typography>
            <Divider />
            <div className="cart-panel">
                {
                    getProducts().map((val, index) => (
                        <Card key={index} component={Paper} className="cart-card">
                            <CardMedia className={classes.media} title="sometitle" image={getImage(val.pictures[0], 'products')} />
                            <CardContent>
                                <Typography variant="h6">{val.name} - {val.brand}</Typography>
                                <Typography variant="h6">Size: {val.size}</Typography>
                                <Typography variant="h6">Theme : <div className="color-box" style={{ background: val.color }}></div></Typography>
                                <Grid container wrap={true}>
                                    <Grid item xs={6}>
                                        <Typography variant="h6">Quantity</Typography>
                                        <div className="quantity-buttons">

                                            <IconButton variant="outline" color="primary" onClick={() => removeFromCart(val.id)}><MinusCircle /></IconButton>
                                            <TextField value={val.quantity} variant="outlined" size="small" disabled />
                                            <IconButton variant="outline" color="primary" onClick={() => addToCart(val.id)}><PlusCircle /></IconButton>
                                        </div>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography variant="h6" align="right">Price</Typography>
                                        <Typography variant="h6" style={{ fontWeight: 'bold' }} align="right">₹{val.sellingCost}</Typography>
                                        <Typography variant="h6" align="right"><del>₹{val.cost}</del></Typography>

                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))
                }
                {
                    getProducts().length <= 0 && <div className="no-banner">
                        <ShoppingBasket />
                        <Typography variant={"h5"}>Add Some Item to Cart!</Typography>

                        <Link size="medium" style={{ cursor: 'pointer' }} href="/home">Continue shopping</Link>
                    </div>
                }
            </div>
            {cart.length > 0 && <div className="billingPanel">
                <Card component={Paper}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <CardHeader title="Saved Address" action={<Button endIcon={<PlusCircle />} 
                                    onClick={() => showAddContainer(true)}>
                                    Add Address
                                </Button>} />
                                <Divider />

                                <div className="address-container">
                                    {savedAddress.map((val, index) => (
                                        <AddressCard key={index} data={val} setDefaultAdd={setdefaultAdd} selectEditAddress={setSelectedAddress} />
                                    ))}
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <CardHeader title="Billing Details" />
                                <Divider />
                                <Grid container className="billing-data" >
                                    <Grid item xs={4}>Amount</Grid>
                                    <Grid item xs={5} style={{ textAlign: "right" }}>₹{billingData.totalAmount}</Grid>
                                    <Grid item xs={4}>Delivery Charges</Grid>
                                    <Grid item xs={5} style={{ textAlign: "right" }}>₹{billingData.deliveryCharges}</Grid>
                                    <Grid item xs={4}>Tax</Grid>
                                    <Grid item xs={5} style={{ textAlign: "right" }}>NA</Grid>
                                    <Grid item xs={4}>Discount</Grid>
                                    <Grid item xs={5} style={{ textAlign: "right", color: 'red' }}>- ₹{billingData.amountSaved}</Grid>
                                    <Grid item xs={4}>Promo Code</Grid>
                                    <Grid item xs={5} style={{ textAlign: "right" }}>NA</Grid>

                                    <Grid item xs={4}>
                                        <Divider />
                                        <Typography variant="h5">Total Payable</Typography></Grid>
                                    <Grid item xs={5} style={{ textAlign: "right" }}>
                                        <Divider />
                                        <Typography variant={"h5"}>₹ {billingData.billAmount}</Typography></Grid>
                                </Grid>
                                <Button startIcon={loadingOrder ? <CircularProgress size={20} /> : null} disabled={!validateOrder()} onClick={createOrder} variant="contained" color="primary" endIcon={<ArrowRight />}>₹ {billingData.billAmount} Checkout</Button>
                            </Grid>

                        </Grid>

                    </CardContent>
                </Card>
            </div>
            } </Container> 
            <ResponsiveDialogs openState={addCont} handleCloseBar={showAddContainer} title="Edit Profile">
                    <AddressUpdate success={showAddContainer} />
                </ResponsiveDialogs>
                <ResponsiveDialogs openState={selectedAddress} handleCloseBar={setSelectedAddress} title="Edit Profile">
                    <AddressUpdate data={selectedAddress} success={setSelectedAddress} />
                </ResponsiveDialogs>
            </AppBaseScreen>)
}
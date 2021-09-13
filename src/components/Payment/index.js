import { Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Container, Divider, Grid, IconButton, Link, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { ArrowRight, ShoppingBasket, Visibility } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { MinusCircle, PlusCircle, ShoppingBag } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import History from '../../@history'
import Auth from '../../api/auth'
import { getImage } from '../../config/Utils'
import { listCart, addToCart as addCart, removeFromCart as removeCart, checkJWT, currentOrder } from '../../store/actions'
import AddressCard from '../common/AddressCard'
import AppBaseScreen from '../common/layout/user/AppBaseScreen'
import CountrySelect from '../common/CountrySelectField'
import './index.less'

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
    const [selectedAddress] = useState(null)
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
        const data= {
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
    if(!cart || !billingData ||
        !savedAddress ||
        !products) {
            return null
        }
    return <AppBaseScreen>
        <Container maxWidth="md" className="payment-container" >
            <Typography variant="h4">  <ShoppingBag /> Cart</Typography>
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
                                        <Typography variant="h6" align="right">₹{val.sellingCost}</Typography>
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
                            {(!addCont) && <Grid item xs={12}>
                                <CardHeader title="Saved Address" action={<Button endIcon={<PlusCircle />} onClick={() => showAddContainer(true)}>
                                    Add Address
                                </Button>} />
                                <Divider />

                                <div className="address-container">
                                    {savedAddress.map((val, index) => (
                                        <AddressCard key={index} data={val} setDefaultAdd={setdefaultAdd} />
                                    ))}
                                </div>
                            </Grid>}
                            {
                                (addCont) && (
                                    <Grid item xs={12}>
                                        <CardHeader title={selectedAddress ? 'Edit Address' : 'Add Address'} action={<IconButton onClick={() => showAddContainer(false)}>
                                            <Visibility />
                                        </IconButton>} />
                                        <Divider />
                                        <Container className="address-form">
                                            <TextField
                                                variant="outlined"
                                                label="Full Name"
                                                placeholder="Full Name"
                                                value={addressForm.name}
                                                helperText={errorFields.name}
                                                fullWidth
                                                size="small"
                                                error={errorFields.name}
                                                onChange={value => change('name', value)}
                                            />
                                            <TextField
                                                variant="outlined"
                                                label="Mobile Number"
                                                placeholder="Mobile Number"
                                                value={addressForm.phoneno}
                                                fullWidth
                                                size="small"
                                                helperText={errorFields.phoneno}
                                                error={errorFields.phoneno}
                                                onChange={value => change('phoneno', value)}
                                            />
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                label="Address 1"
                                                placeholder="Location/Address"
                                                value={addressForm.address1}
                                                helperText={errorFields.address1}
                                                size="small"
                                                error={errorFields.address1}
                                                onChange={value => change('address1', value)}
                                                multiline
                                            />
                                            <TextField
                                                variant="outlined"
                                                label="Address 2"
                                                placeholder="House No/Locality"
                                                value={addressForm.address2}
                                                helperText={errorFields.address2}
                                                fullWidth
                                                size="small"
                                                error={errorFields.address2}
                                                onChange={value => change('address2', value)}
                                                multiline
                                            />
                                            <TextField
                                                variant="outlined"
                                                label="Landmark"
                                                placeholder="LandMark"
                                                value={addressForm.landmark}
                                                helperText={errorFields.landmark}
                                                fullWidth
                                                size="small"
                                                error={errorFields.landmark}
                                                onChange={value => change('landmark', value)}
                                            />
                                            <TextField
                                                variant="outlined"
                                                label="City"
                                                placeholder="City"
                                                value={addressForm.city}
                                                helperText={errorFields.city}
                                                error={errorFields.city}
                                                onChange={value => change('city', value)}
                                                fullWidth
                                                size="small"
                                            />
                                            <TextField
                                                variant="outlined"
                                                label="State"
                                                placeholder="State"
                                                value={addressForm.state}
                                                helperText={errorFields.state}
                                                error={errorFields.state}
                                                onChange={value => change('state', value)}
                                                fullWidth
                                                size="small"
                                            />
                                            <TextField
                                                variant="outlined"
                                                label="Pincode"
                                                placeholder="Pincode"
                                                helperText={errorFields.pincode}
                                                error={errorFields.pincode}
                                                value={addressForm.pincode}
                                                onChange={value => change('pincode', value)}
                                                fullWidth
                                                size="small"
                                            />
                                            <CountrySelect />
                                            <TextField
                                                variant="outlined"
                                                label="Country"
                                                placeholder="Country"
                                                helperText={errorFields.country}
                                                error={errorFields.country}
                                                value={addressForm.country}
                                                onChange={value => change('country', value)}
                                                fullWidth
                                                size="small"
                                            />
                                            <Button variant="contained" color="primary" onClick={saveAddress}>{loading ? <CircularProgress size={20} /> : 'Save Address'}</Button>
                                        </Container>
                                    </Grid>
                                )
                            }
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
    </AppBaseScreen>
}
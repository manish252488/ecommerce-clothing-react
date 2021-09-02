import { Button, Card, CardContent, CardHeader, CardMedia, Container, Divider, Grid, IconButton, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { Visibility } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { MinusCircle, PlusCircle, ShoppingBag } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import Auth from '../../api/auth'
import { getImage } from '../../config/Utils'
import { listCart, listProducts, addToCart as addCart, removeFromCart as removeCart, checkJWT } from '../../store/actions'
import AddressCard from '../common/AddressCard'
import CustomizedSpinner from '../common/CustomizedSpinner'
import AppBaseScreen from '../common/layout/user/AppBaseScreen'
import Stripe from '../common/Stripe'
import './index.less'

const useStyles = makeStyles({
    media: {
        height: 220,
        margin: 10,
        width: "100%",
        backgroundPosition: 'inherit',
        transition: '0.5s',
        cursor: 'pointer',
        border: '2px solid #ddd'
    },
})
export default function Payment(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const billingData = useSelector(({ Auth }) => Auth.billingData)
    const cart = useSelector(({ Auth }) => Auth.cart)
    const savedAddress = useSelector(({ Auth }) => Auth.user.savedAddress)
    const products = useSelector(({ products }) => products.products)
    const [selectedAddress] = useState(null)
    const [loading, setLoading] = useState(false);
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
        dispatch(listProducts())
        dispatch(listCart())
    }, [dispatch])
    const addToCart = id => {
        dispatch(addCart(id))
    }
    const removeFromCart = id => {
        dispatch(removeCart(id))
    }
    const getProducts = () => {
        let productsAdded = []
        cart.forEach(val => {
            const sample = products.find(c => c.id === val.product)
            if (sample) {
                sample.quantity = cart.find(v => v.product === sample.id)?.quantity
                productsAdded.push(sample)
            }
        })
        return productsAdded;
    }
    const saveAddress = () => {
        console.log(validate())
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
                console.log(key)
                flag = false
                errors[key] = "Cannot be Empty!"
            }
        }
        setErrorFields(errors)
        return flag
    }

    /* const createOrder = () =>{
        
    } */
    const checkStripeAccess = () => {
        if(savedAddress.find(v=> v.default === true) && cart.length>0) {
            return false
        }
    }
    return <AppBaseScreen>
        <Container className="payment-container" >
       
            <Typography variant="h4">  <ShoppingBag /> Cart</Typography>
            <div className="cart-panel">
                {
                    getProducts().map(val => (
                        <Card component={Paper} className="cart-card">
                            <CardMedia className={classes.media} title="sometitle" image={getImage(val.pictures[0])} />
                            <CardContent>
                                <Typography variant="h6">{val.name} - {val.brand}</Typography>
                                <Typography variant="h6">size</Typography>
                                <Typography variant="h6">colors</Typography>
                                <Typography variant="h6" align="right">₹{val.sellingCost}</Typography>
                                <Typography variant="h6" align="right"><del>₹{val.cost}</del></Typography>
                                <Typography variant="h6">quantity</Typography>
                                <div className="quantity-buttons">
                                    <IconButton variant="outline" color="primary" onClick={() => removeFromCart(val.id)}><MinusCircle /></IconButton>
                                    <TextField value={val.quantity} variant="outlined" size="small" disabled />
                                    <IconButton variant="outline" color="primary" onClick={() => addToCart(val.id)}><PlusCircle /></IconButton>
                                </div>

                            </CardContent>
                        </Card>
                    ))
                }
                {
                    getProducts().length <= 0 && <div className="no-banner">
                        <Typography variant={"h5"}>Add Some Item to Cart!</Typography>
                    </div>
                }
            </div>
            <div className="billingPanel">
                <Card component={Paper}>
                    <CardContent>
                        <Grid container>
                            {(!addCont) && <Grid item xs={12}>
                                <CardHeader title="Saved Address" action={<Button endIcon={<PlusCircle/>} onClick={() => showAddContainer(true)}>
                                    Add Address
                                </Button>}/>
                                <Divider />

                                <div className="address-container">
                                    {savedAddress.map((val, index) => (
                                        <AddressCard key={index} data={val} setDefaultAdd={setdefaultAdd}/>
                                    ))}
                                </div>
                            </Grid>}
                            {
                                (addCont) && (
                                    <Grid item xs={12}>
                                        <CardHeader title={selectedAddress ? 'Edit Address' : 'Add Address'} action={<IconButton onClick={() => showAddContainer(false)}>
                                    <Visibility/>
                                </IconButton>}/>
                                        <Divider />
                                        <Container className="address-form">
                                            <TextField
                                                variant="outlined"
                                                label="Full Name"
                                                placeholder="Full Name"
                                                value={addressForm.name}
                                                helperText={errorFields.name}
                                                error={errorFields.name}
                                                onChange={value => change('name', value)}
                                            />
                                            <TextField
                                                variant="outlined"
                                                label="Mobile Number"
                                                placeholder="Mobile Number"
                                                value={addressForm.phoneno}
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
                                                error={errorFields.address1}
                                                onChange={value => change('address1', value)}
                                                multiline
                                            />
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                label="Address 2"
                                                placeholder="House No/Locality"
                                                value={addressForm.address2}
                                                helperText={errorFields.address2}
                                                error={errorFields.address2}
                                                onChange={value => change('address2', value)}
                                                multiline
                                            />
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                label="Landmark"
                                                placeholder="LandMark"
                                                value={addressForm.landmark}
                                                helperText={errorFields.landmark}
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
                                            />
                                            <TextField
                                                variant="outlined"
                                                label="State"
                                                placeholder="State"
                                                value={addressForm.state}
                                                helperText={errorFields.state}
                                                error={errorFields.state}
                                                onChange={value => change('state', value)}
                                            />
                                            <TextField
                                                variant="outlined"
                                                label="Pincode"
                                                placeholder="Pincode"
                                                helperText={errorFields.pincode}
                                                error={errorFields.pincode}
                                                value={addressForm.pincode}
                                                onChange={value => change('pincode', value)}
                                            />
                                            <TextField
                                                variant="outlined"
                                                label="Country"
                                                placeholder="Country"
                                                helperText={errorFields.country}
                                                error={errorFields.country}
                                                value={addressForm.country}
                                                onChange={value => change('country', value)}
                                            />
                                            <Button variant="contained" color="primary" onClick={saveAddress}>{loading ? <CustomizedSpinner style={{ width: 25, height: 25 }} /> : 'Save Address'}</Button>
                                        </Container>
                                    </Grid>
                                )
                            }
                            <Grid item xs={6}>
                                <CardHeader title="Billing Details" />
                                <Divider />
                                <Grid className="billing-data" >
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
                                <Stripe amount={billingData.billAmount} disabled={checkStripeAccess()}/>
                            </Grid>

                        </Grid>

                    </CardContent>
                </Card>
            </div>
        </Container>
    </AppBaseScreen>
}
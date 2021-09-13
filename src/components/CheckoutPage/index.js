import { Container, Divider, Grid, List, ListItem, Button, ListItemIcon, ListItemText, makeStyles, Typography, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import History from '../../@history';
import OrderApis from '../../api/order';
import { getImage, renderIfElse } from '../../config/Utils';
import { checkJWT, currentOrder, listCart, showMessageBar } from '../../store/actions';
import AddressCard from '../common/AddressCard';
import AppBaseScreen from '../common/layout/user/AppBaseScreen'
import Razorpay from '../common/Razorpay';
import './index.less'
const useStyles = makeStyles(({
    root: {
        minHeight: 500,
        padding: 20
    }
}))
export default function CheckoutPage(props) {
    const order = useSelector(({ orders }) => orders?.current_order)
    const cart = useSelector(({ Auth }) => Auth?.cart)
    const classes = useStyles();
    const [orderId, setOrderId] = useState(order.id || null)
    const [loadingOrder, setLoadingOrder] = useState(false)
    const [orderData,setOrderData] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listCart())
    }, [dispatch])
    if(!order || order === {}){
        History.push("/cart")
    }
    const createOrder = () => {
        setLoadingOrder(true)
        if (order) {
            OrderApis.createOrder(order).then(res => {
                setLoadingOrder(false)
                if (res.data && res.data.id) {
                    dispatch(listCart())
                    setOrderId(res.data.id)
                    setOrderData(res.data)
                    dispatch(currentOrder(res.data))
                } else {
                    setLoadingOrder(false)
                    dispatch(showMessageBar('error', res.message))
                }
            }).catch(err => {
                setLoadingOrder(false)
                dispatch(showMessageBar('error', err.message))
            })
        }
    }
    const onPaymentFailed = () => {
        History.push("/cart")
    }
    const onPaymentSuccess = () => {
        dispatch(checkJWT())
        History.push('/myorders')
        dispatch(currentOrder({}))
    }
    const LoadingComponent = () => <div>loading</div>
    const PaymentComponent = () => (
        <Container maxWidth="lg" className={classes.root + ' payment-component'}>
            <Grid container className="MuiGrid-container-1">
                <Grid item xs={8}>
                    <Container>
                        <Typography variant="h5">Products</Typography>
                        <Divider />
                        <List >
                            {
                                order?.products.map((val, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <img src={getImage(val.pictures[0], 'products')} className="image" alt="product" />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography variant="h5" color="primary">{val.name} &nbsp;- &nbsp;{val.brand}</Typography>
                                            <Typography variant="h6">₹{val.sellingCost}-<del>₹{val.cost}</del></Typography>
                                            <Typography variant="h6">Size: {val?.size || 'NA'}</Typography>
                                            <Typography variant="h6">Color: {val?.color || 'NA'}</Typography>
                                            <Typography variant="h6">Quantity: {val?.quantity || 'NA'}</Typography>
                                        </ListItemText>
                                    </ListItem>
                                ))
                            }

                        </List>
                        <Divider />
                        <Typography variant="h5" style={{ paddingTop: 10, paddingBottom: 10 }}>Shipping Address</Typography>
                        <AddressCard data={order?.billingAddress} width="100%" />
                        {!orderId && <Button  style={{width: '50%', marginTop: 20}} variant="contained" size="small" startIcon={loadingOrder? <CircularProgress size={20} color="secondary"/>: <></>} fullWidth color="primary" onClick={createOrder}>Confirm</Button>}

                    </Container>
                </Grid>
             { orderId &&  <Grid item xs={4} className="billing-panel">
                    <Typography variant="h5">Proceed To Pay</Typography>
                    <Divider />
                    <Grid container>
                        <Grid item xs={6}>Amount</Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>₹{cart?.billingData?.totalAmount}</Grid>
                        <Grid item xs={6}>Delivery Charges</Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>₹{cart?.billingData?.deliveryCharges}</Grid>
                        <Grid item xs={6}>Tax</Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>NA</Grid>
                        <Grid item xs={6}>Discount</Grid>
                        <Grid item xs={6} style={{ textAlign: "right", color: 'red' }}>- ₹{cart?.billingData?.amountSaved}</Grid>
                        <Grid item xs={6}>Promo Code</Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>NA</Grid>

                        <Grid item xs={6}>
                            <Divider />
                            <Typography variant="h6">Total Payable</Typography></Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>
                            <Divider />
                            <Typography variant={"h5"}>₹ {cart?.billingData?.billAmount}</Typography></Grid>


                    </Grid>
                    {orderId && <Razorpay order={orderData} amount={cart?.billingData?.billAmount} onFailed={onPaymentFailed} onSuccess={onPaymentSuccess}/>}
                    {/* <Stripe orderId={orderId} amount={cart?.billingData?.billAmount} disabled={false} /> */}
                    {/* {orderId && <StripeCards orderId={orderId} amount={cart?.billingData?.billAmount} onFailed={onPaymentFailed} onSuccess={onPaymentSuccess}></StripeCards>} */}
                </Grid>
            }</Grid>

        </Container>
    )
    return <AppBaseScreen>
        {
            renderIfElse(order && cart, <PaymentComponent />, <LoadingComponent />)
        }

    </AppBaseScreen>
}
import { Container, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getImage, renderIfElse } from '../../config/Utils';
import { listOrders } from '../../store/actions';
import AddressCard from '../common/AddressCard';
import AppBaseScreen from '../common/layout/user/AppBaseScreen'
import Stripe from '../common/Stripe'
import './index.less'
const useStyles = makeStyles(({
    root: {
        minHeight: 500,
        padding: 20
    }
}))
export default function CheckoutPage(props) {
    const { orderId } = useParams();
    const orderData = useSelector(({ orders }) => orders?.list)
    const order = orderData.find(val => val.id === orderId)
    const classes = useStyles();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listOrders())
    }, [dispatch])
    if(!orderData && orderData.length <= 0 && !order){
        return null
    }
    console.log(order)
    const LoadingComponent = () => <div>loading</div>
    const PaymentComponent = () => (
        <Container maxWidth="lg" className={classes.root + ' payment-component'}>
            <Grid container className="MuiGrid-container-1">
                <Grid item xs={8}>
                    <Container>
                        <Typography variant="h5">Products</Typography>
                        <Divider/>
                        <List >
                        {
                            order?.products.map(val => (
                                <ListItem>
                                    <ListItemIcon>
                                        <img src={getImage( val.pictures[0], 'products')} className="image" alt="product"/>
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
                        <Typography variant="h5" style={{paddingTop: 10, paddingBottom: 10}}>Shipping Address</Typography>
                        <AddressCard data={order?.billingAddress} width="100%"/>
                    </Container>
                </Grid>
                <Grid item xs={4} className="billing-panel">
                    <Typography variant="h5">Proceed To Pay</Typography>
                    <Divider />
                    <Grid container>
                        <Grid item xs={6}>Amount</Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>₹{order?.billingData.totalAmount}</Grid>
                        <Grid item xs={6}>Delivery Charges</Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>₹{order?.billingData.deliveryCharges}</Grid>
                        <Grid item xs={6}>Tax</Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>NA</Grid>
                        <Grid item xs={6}>Discount</Grid>
                        <Grid item xs={6} style={{ textAlign: "right", color: 'red' }}>- ₹{order?.billingData?.amountSaved}</Grid>
                        <Grid item xs={6}>Promo Code</Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>NA</Grid>

                        <Grid item xs={6}>
                            <Divider />
                            <Typography variant="h6">Total Payable</Typography></Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>
                            <Divider />
                            <Typography variant={"h6"}>₹ {order?.billingData?.billAmount}</Typography></Grid>

                        
                    </Grid>
                    <Stripe orderId={orderId} amount={order?.billingData?.billAmount} disabled={false} />
                </Grid>
            </Grid>

        </Container>
    )
    return <AppBaseScreen>
        {
            renderIfElse(orderData && orderData.length > 0, <PaymentComponent />, <LoadingComponent />)
        }

    </AppBaseScreen>
}
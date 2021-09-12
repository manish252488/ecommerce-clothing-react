import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders, showMessageBar } from '../../store/actions';
import AppBaseScreen from '../common/layout/user/AppBaseScreen';
import './index.less'
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, CardHeader, Container, Divider, Grid, Link, Typography } from '@material-ui/core'
import { ExpandMore, FileCopyOutlined, LocalShipping, Replay, ShoppingBasket } from '@material-ui/icons';
import moment from 'moment';
import AddressCard from '../common/AddressCard';
import ReactSteps from '../common/ReactSteps';
export default function MyOrders(props) {
    const orders = useSelector(({ orders }) => orders.list)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listOrders())
    }, [dispatch])
    const copyToClipBoard = (text) => {
        navigator.clipboard.writeText(text);
        dispatch(showMessageBar('success', 'Order Id copied!'))
    }
    if (!orders) {
        return null
    }
    const orderStatus = [
        "initiated",
        "shipped",
        "arrived",
        "dilivered",
    ]
    const orderStatusValues = {
        initiated: 'initiated',
        shipped: 'shipped',
        arrived: 'arrived',
        dilivered: 'dilivered',
        canceled: 'canceled'
      }
    const transactionStatus = {
        paid: 'paid',
        unpaid: 'unpaid',
        pending: 'pending',
        cancel: 'cancel',
        refund: 'refund'
      }
    console.log(orders[0])
    return <AppBaseScreen>
        <Container maxWidth="md" className="order-container">

            <CardHeader avatar={<LocalShipping />} title="My Orders"></CardHeader>
            <Divider />
            {(orders || orders.length > 0) && (<div className="card-container">
                {orders?.map(orderdata => <Card className="order-card" key={orderdata.id}>
                    <CardContent>
                        <Typography onClick={() => copyToClipBoard(orderdata.id)} vaiant="h6" style={{ display: 'flex', cursor: 'pointer' }}><FileCopyOutlined /> {orderdata?.id}</Typography>
                        <Divider />
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMore color="primary" />} >
                                <Typography variant="h6">Products</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container>
                                    {orderdata?.products?.map(product => <Grid key={product.id} item xs={12}>
                                        <Grid container>
                                            <Grid xs={5}>
                                                {product?.pictures && <img src={product?.pictures ? product?.pictures[0] : ""} alt={product?.id} className="image"/>}
                                            </Grid>
                                            <Grid xs={7}>
                                                <Typography variant="h6" color="primary"> {product?.name}</Typography>
                                                <Typography variant="h6">₹{product?.cost}</Typography>
                                                <Typography variant="h6">{product?.color}</Typography>
                                                <Typography variant="h6">{product?.size}</Typography>
                                                <Typography variant="h6">Quantity: {product?.quantity}</Typography>
                                            </Grid>
                                        </Grid>
                                        {orderdata?.products.length > 1 && (<Divider ></Divider>)}
                                    </Grid>)}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion >
                            <AccordionSummary expandIcon={<ExpandMore color="primary" />} >
                                <Typography variant="h6">Billing Address</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <AddressCard data={orderdata?.billingAddress} />
                            </AccordionDetails>
                        </Accordion>
                        <Typography variant="h5">₹{orderdata?.billingData.billAmount}</Typography>
                        <Typography variant="h6">{orderdata?.transactionStatus}</Typography>
                        <Typography variant="h6">{moment(orderdata?.createdDate).fromNow()} - {moment(orderdata?.createdDate).format("DD-MMM-YYYY")}</Typography>
                        <ReactSteps steps={orderStatus} activeStep={orderdata?.transactionStatus === transactionStatus.pending ? -1 : orderStatus.indexOf(orderdata.orderStatus)} />
                        {orderdata?.transactionStatus === transactionStatus.pending && (
                        <Button variant="contained" size="small" endIcon={<Replay color="secondary" />} color="primary">Retry</Button>)}
                         {(orderdata?.transactionStatus !== transactionStatus.pending && orderdata?.orderStatus !== orderStatusValues.canceled && orderdata?.orderStatus !== orderStatusValues.dilivered) && (
                        <Button variant="contained" size="small" color="primary">Cancel</Button>)}
        
                    </CardContent>
                </Card>)}
            </div>)}
            {
                (!orders || orders.length <= 0) && (
                    <CardContent className="no-banner">

                        <ShoppingBasket />
                        <Typography variant={"h5"}>Get your Dapper Look now!!</Typography>

                        <Link size="medium" style={{ cursor: 'pointer' }} href="/home">Continue shopping</Link>
                    </CardContent>
                )
            }
        </Container>
    </AppBaseScreen>
}
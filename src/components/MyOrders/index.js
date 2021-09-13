import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders, showMessageBar } from '../../store/actions';
import AppBaseScreen from '../common/layout/user/AppBaseScreen';
import './index.less'
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, CardHeader, Container, Divider, Grid, Link, Typography } from '@material-ui/core'
import { ExpandMore, FileCopyOutlined, LocalShipping, Replay, ShoppingBasket } from '@material-ui/icons';
import moment from 'moment';
import AddressCard from '../common/AddressCard';
import ReactSteps from '../common/ReactSteps';
import ChipCards from '../common/ChipCards';
export default function MyOrders(props) {
    const orderData = useSelector(({ orders }) => orders.list)
    const dispatch = useDispatch()
    const observer = useRef()
    const [orders, setOrders] = useState(orderData.slice(0, 10) || [])
    const [page, setPage] = useState(5)
    useEffect(() => {
        dispatch(listOrders())
    }, [dispatch])
    const copyToClipBoard = (text) => {
        navigator.clipboard.writeText(text);
        dispatch(showMessageBar('success', 'Order Id copied!'))
    }
    useEffect(()=> {
       setOrders(orderData.slice(0,page))
        // eslint-disable-next-line
    }, [page, orderData])
    const lastBookElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            setPage(prev => prev+5)
          }
        })
        if (node) observer.current.observe(node)
        // eslint-disable-next-line
      }, [])

    if (!orders) {
        return null
    }
    const orderStatus = [
        "initiated",
        "shipped",
        "arrived",
        "dilivered",
    ]
  /*   const orderStatusValues = {
        initiated: 'initiated',
        shipped: 'shipped',
        arrived: 'arrived',
        dilivered: 'dilivered',
        canceled: 'canceled'
    } */
    const transactionStatus = {
        paid: 'paid',
        unpaid: 'unpaid',
        pending: 'pending',
        cancel: 'cancel',
        refund: 'refund'
    }
    return <AppBaseScreen>
        <Container maxWidth="md" className="order-container">

            <CardHeader avatar={<LocalShipping color="primary"/>} title="My Orders"></CardHeader>
            <Divider />
            {(orders || orders.length > 0) && (<div className="card-container">
                {orders?.map((orderdata, index) => {
                    return (<Card className="order-card" key={index}>
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
                                                {product?.pictures && <img src={product?.pictures ? product?.pictures[0] : ""} alt={product?.id} className="image" />}
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
                        <ChipCards type={orderdata?.transactionStatus === transactionStatus.paid ? "success" : orderdata?.transactionStatus === transactionStatus.pending ? "warning" : orderdata?.transactionStatus === transactionStatus.refund ? "success" : "error"} text={orderdata?.transactionStatus} />
                        <Typography variant="body1">{orderdata?.transactionType ? '@'+orderdata?.transactionType :""}</Typography>
                        
                        <Typography variant="h6">{moment(orderdata?.createdDate).fromNow()} - {moment(orderdata?.createdDate).format("DD-MMM-YYYY")}</Typography>
                        {(orderdata.transactionType === "cod" || orderdata?.transactionStatus === transactionStatus.paid) &&
                         <ReactSteps steps={orderStatus} activeStep={orderdata?.transactionStatus === transactionStatus.pending ? -1 : orderStatus.indexOf(orderdata.orderStatus)} />}
                        {orderdata?.transactionStatus === transactionStatus.pending && (
                            <Button variant="contained" size="small" endIcon={<Replay color="secondary" />} color="primary">Retry</Button>)}
                        {(orderdata.transactionType === "cod" || orderdata?.transactionStatus === transactionStatus.paid) && (
                            <Button variant="contained" size="small" color="primary">Cancel</Button>)}
                       { (orders.length === index + 1) && <div ref={lastBookElementRef}></div>}
                    </CardContent>
                </Card>)})}
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
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 10}}>
            {orderData.length === orders.length && <Link>No More Orders!</Link>
            }</div>
        </Container>
    </AppBaseScreen>
}
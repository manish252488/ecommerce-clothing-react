import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../store/actions';
import AppBaseScreen from '../common/layout/user/AppBaseScreen';
import './index.less'
import { Card, CardContent, CardHeader, Divider, Grid, Paper, Typography } from '@material-ui/core'
import { FileCopyOutlined, LocalShipping } from '@material-ui/icons';
export default function MyOrders(props) {
    const orders = useSelector(({ orders }) => orders.list)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listOrders())
    }, [dispatch])
    if(!orders || orders.length <= 0) {
        return null
    }
    const copyToClipBoard = (text) => {

        navigator.clipboard.writeText(text);
      
        /* Alert the copied text */
        alert("Copied the OrderId: " + text);
    }
    return <AppBaseScreen>
        <Card className="order-container" component={Paper}>
            <CardHeader avatar={<LocalShipping />} title="My Orders"></CardHeader>
            <Divider/>
            <CardContent>
                {orders?.map(orderdata => <Card key={orderdata.id}>
                    <CardContent>
                        <Typography onClick={() => copyToClipBoard(orderdata.id)} vaiant="h6" style={{display: 'flex' , cursor: 'pointer'}}><FileCopyOutlined/> {orderdata?.id}</Typography>
                        <Typography variant="h5">Products</Typography>
                        <Divider ></Divider>
                        <Grid container wrap={true}>
                            {orderdata?.products?.map(product => <Grid key={product.id} item xs={6}>
                                {product.name}
                                {product.color}
                                {product?.size}
                            </Grid>)}
                        </Grid>
                        <Typography variant="h6">Billing</Typography>
                        <Typography variant="h6">status</Typography>
                        <Typography variant="h6">amount</Typography>
                        <Typography variant="h6">order status</Typography>
                        <Typography variant="h5">dilivery date</Typography>
                        <Typography variant="h6">placed on</Typography>
                    </CardContent>
                </Card>)}
            </CardContent>
        </Card>
    </AppBaseScreen>
}
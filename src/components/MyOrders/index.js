import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../store/actions';
import AppBaseScreen from '../common/layout/user/AppBaseScreen';
import { Card, CardContent, CardHeader, Divider, Grid, Paper, Typography } from '@material-ui/core'
export default function MyOrders(props){
    const orders = useSelector(({orders}) => orders.list)
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(listOrders())
    },[dispatch])
    return <AppBaseScreen>
        <Card component={Paper}>
            <CardHeader title="My Orders"/>
            <Divider />
            <CardContent>
                { orders.map(orderdata => <Card key={orderdata.id}>
                    <CardContent> 
                        <Grid container>
                            {orderdata.products.map(product => <Grid key={product.id} item xs={12}>
                            {product.name}
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
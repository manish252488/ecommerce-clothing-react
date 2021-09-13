import React, { useState } from 'react';
import { makeStyles, Accordion, AccordionActions, CircularProgress, AccordionSummary, AccordionDetails, Typography, Button } from '@material-ui/core'
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { PaymentOutlined, ExpandLessOutlined } from '@material-ui/icons';
import { loadStripe } from '@stripe/stripe-js';
import constants from '../../../config/constants';
import './index.less'
import StripeApi from '../../../api/stripe';
import { useDispatch } from 'react-redux';
import { showMessageBar } from '../../../store/actions';
const stripePromise = loadStripe(constants.stripe_pk);
const useStyles = makeStyles(theme => ({
    headings: {
        fontWeight: 'bold'
    },
    root: {
        padding: theme.spacing(1),
        [theme.breakpoints.down("md")]: {
            padding: 0
        }
    }

}))

const iframeStyles = {
    base: {
        color: "#de6262",
        fontSize: "16px",
        iconColor: "#fff",
        "::placeholder": {
            color: "#87bbfd"
        }
    },
    invalid: {
        iconColor: "#FFC7EE",
        color: "red"
    },
    complete: {
        iconColor: "#cbf4c9"
    }
};
const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
};
export default function StripeCards(props) {
    return (
        <Elements stripe={stripePromise}>
            <WrappedComponent {...props} />
        </Elements>)
}
function WrappedComponent({ orderId,
    amount,onSuccess, onFailed }) {

    const stripe = useStripe();
    const elements = useElements();
    const classes = useStyles()
    const [loading, isLoading] = useState(false)
    const dispatch = useDispatch()

    const handleFormSubmit = async (ev) => {
        ev.preventDefault();
        isLoading(true)
        try{
        if (orderId) {
            const cardElement = elements.getElement("card");
            const { data } = await StripeApi.createPaymentIntent(orderId)
            const paymentObject = data.paymentObject;
            const picreated = data.paymentIntent;
            const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: paymentObject
            });
            
            if (paymentMethodReq.error) {
                dispatch(showMessageBar('error',paymentMethodReq.error.message))
                isLoading(false)
                return;
            }
            const {paymentIntent} = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id
            })
            console.log(picreated)
            const { data: confirmResponse } = await StripeApi.confirmPayment({
                clientSecret: data.clientSecret,
                orderId: orderId,
                pi: paymentIntent?paymentIntent.id:picreated.id
            })
            if(confirmResponse.status){
                dispatch(showMessageBar('success',confirmResponse.message))
            }
            isLoading(false)
            onSuccess();
        } else {
            onFailed();
        }
    }catch(err){
        console.log(err)
        dispatch(showMessageBar('error',err.message))
        isLoading(false)
    } 
    }
    
    const handleCardDetailsChange = (ev) => {
        if (ev.error) {
            dispatch(showMessageBar('error', ev.error.message))
        }
    }
    return <div className={classes.root}>
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandLessOutlined />}>
                <PaymentOutlined color="primary" />&nbsp;&nbsp;
                <Typography variant="h6" className={classes.headings}> PAY WITH DEBIT/CREDIT CARD</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <form onSubmit={handleFormSubmit} className="card-container">
                    <CardElement
                        options={cardElementOpts}
                        onChange={handleCardDetailsChange} />
                    <Button type="submit" variant="contained" color="primary" size="small" fullWidth
                        startIcon={loading && <CircularProgress size={20} color="secondary" />}
                    >Pay ₹{amount} </Button>
                </form>
            </AccordionDetails>
            <AccordionActions>

            </AccordionActions>
        </Accordion>
    </div>
}
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessageBar } from '../../../store/actions';
import { Button, CircularProgress } from '@material-ui/core';
import RazorpayApi from '../../../api/Razorpay';
import constants from '../../../config/constants';
export default function Razorpay({ order, amount, onSuccess, onFailed }) {
    const user = useSelector(({ Auth }) => Auth.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        try {
            let decriptionofprod = "payment of products!"
            setLoading(true)
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );
            if (!res) {
                dispatch(showMessageBar('error',"please connect to the internet?"))
                setLoading(false)
                return;
            }
            // creating a new order
            const result = await RazorpayApi.createOrder({ orderId: order.id });
            // Getting the order details back
            if(result.data){
                const { amount, id: order_id, currency } = result.data;
                const options = {
                    key: constants.razorpay_key,
                    amount: amount.toString(),
                    currency: currency,
                    description: decriptionofprod,
                    order_id: order_id,
                    handler: async function (response) {
                        const data = {
                            orderCreationId: order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                            orderId: order.id
                        };
    
                        const result = await RazorpayApi.onPaymentSuccess(data);
                        if(result.data){
                            dispatch(showMessageBar('success', result.message))
                            onSuccess()
                            setLoading(false)
                        } else {
                            dispatch(showMessageBar('success', result.message))
                            onFailed()
                            setLoading(false)
                        }
                    },
                    prefill: {
                        name: user.name,
                        email: user.email,
                        contact: user.phoneNo,
                    },
                    notes: {
                        address: "some address",
                    },
                };
    
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } else {
                dispatch(showMessageBar('error', result.message))
                onFailed()
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            dispatch(showMessageBar('error', err.message))
            onFailed()
        }
    }
    return (
        <Button
            variant="contained"
            color="primary"
            size="small"
            fullWidth
            startIcon={loading ? <CircularProgress color="secondary" size={20} /> : null}
            onClick={displayRazorpay}>
            Pay ₹{amount}
        </Button>
    );
}


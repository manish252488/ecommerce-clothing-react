import { client } from "./client";

const StripeApi = {
  createSession: (data) => client.post("/stripe/create-session", data),
  createPaymentIntent: (orderid) => client.post("/stripe-v2/create-payment",{orderId: orderid}),
  confirmPayment: (data = { orderId: null , clientSecret: null ,payment_method: null }) => client.post("/stripe-v2/confirm-payment", data)
};

export default StripeApi;

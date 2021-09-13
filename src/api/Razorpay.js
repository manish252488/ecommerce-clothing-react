import { client } from "./client";

const RazorpayApi = {
    createOrder: (data) => client.post("/payment/orders", data),
    onPaymentSuccess: (data) => client.post("/payment/success", data)
};

export default RazorpayApi;
import { client } from "./client";

const OrderApis = {
  createOrder: (data) => client.post(`/orders/create`, data),
  getOrderDetails: (id) => client.get(`/order/detail?=${id}`),
  listOrders: () => client.get('/orders/list')
};

export default OrderApis;

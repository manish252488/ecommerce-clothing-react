import { client } from "./client";

const CartApi = {
  addCart: (id) => client.put("/cart/add", {productId: id}),
  removeCart: (id) => client.put("/cart/remove", {productId: id}),
  listCart: () => client.get("/cart/list")
};

export default CartApi;

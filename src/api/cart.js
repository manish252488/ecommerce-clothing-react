import { client } from "./client";

const CartApi = {
  addCart: (data) => client.put("/cart/add", data),
  removeCart: (id) => client.put("/cart/remove", {productId: id}),
  listCart: () => client.get("/cart/list")
};

export default CartApi;

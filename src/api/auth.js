import { client } from "./client";

const Auth = {
  login: (data) => client.post("/users/login", data),
  signup: (data) => client.post("/users/create", data),
  checkAuth: () => client.get("/users/check"),
  signOut: () => Promise.resolve(),
  addAddress: (data) => client.post("/users/address-create", data),
  setDefaultAddress: (id) => client.post("/users/address-default", {id: id}),
  deleteAddress: (id) => client.delete("/users/delete-address", {id: id}),
  updateAddress: (data) => client.post("/users/address-update", data)
};

export default Auth;

import { client } from "./client";

const Auth = {
  login: (data) => client.post("/users/login", data),
  signup: (data) => client.post("/users/create", data),
  checkAuth: () => client.get("/users/check"),
  signOut: () => Promise.resolve(),
};

export default Auth;

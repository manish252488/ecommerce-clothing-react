import { client } from "./client";

const Admin = {
  listUsers: () => client.get("/users/list"),
};

export default Admin;

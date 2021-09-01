
import Component from ".";
import authRoles from "../../config/authRoles";
const AuthRoutes = {
  auth: authRoles.guest,
  routes: [
    {
      path: "/login",
      component: Component,
      exact: true,
    }
  ],
};
export default AuthRoutes;

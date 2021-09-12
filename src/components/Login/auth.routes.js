
import { Redirect } from "react-router";
import Component from ".";
import authRoles from "../../config/authRoles";
const AuthRoutes = {
  auth: authRoles.guest,
  routes: [
    {
      path: "/auth/:tab",
      component: Component,
      exact: true,
    },
    {
      path: "/login",
      component: () => <Redirect to="/auth/login"/>,
      exact: true
    },{
      path: "/signup",
      component: () => <Redirect to="/auth/signup"/>,
      exact: true
    }
  ],
};
export default AuthRoutes;

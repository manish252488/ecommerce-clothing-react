
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
      component: () => <Redirect to="/auth/login"/>
    },{
      path: "/signup",
      component: () => <Redirect to="/auth/signup"/>
    }
  ],
};
export default AuthRoutes;

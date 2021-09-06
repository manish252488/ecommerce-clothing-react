
import { Redirect } from "react-router";
import Component from ".";
import authRoles from "../../config/authRoles";
const AuthRoutes = {
  auth: authRoles.guest,
  routes: [
    {
      path: "/auth/login/:tab",
      component: Component,
      exact: true,
    },
    {
      path: "/auth/signup/:tab",
      component: Component,
      exact: true,
    },
    {
      path: "/login",
      component: () => <Redirect to="/auth/login/1"/>
    },{
      path: "/signup",
      component: () => <Redirect to="/auth/signup/1"/>
    }
  ],
};
export default AuthRoutes;

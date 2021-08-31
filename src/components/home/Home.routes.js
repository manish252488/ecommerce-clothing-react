import { Redirect } from "react-router";
import Home from ".";
import authRoles from "../../config/authRoles";
import Contacts from "./Contacts";
import ProductDetails from "./ProductDetails";
const HomeRoutes = {
  auth: authRoles.guest,
  routes: [
    {
      path: "/home",
      component: Home,
      exact: true,
    },
    {
      path: '/product',
      component: ProductDetails,
      exact: true
    },
    {
      path: '/product:/productId',
      component: ProductDetails,
      exact: true
    },
    {
      path: '/services',
      component: Contacts,
      exact: true
    }
  ],
};
export default HomeRoutes;

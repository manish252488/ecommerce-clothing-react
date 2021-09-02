
import Component from ".";
import authRoles from "../../config/authRoles";
const CheckoutRoutes = {
  auth: authRoles.user,
  routes: [
    {
      path: "/checkout/:orderId",
      component: Component,
      exact: true,
    },
  ],
};
export default CheckoutRoutes;


import Payment from ".";
import authRoles from "../../config/authRoles";
const PaymentRoutes = {
  auth: authRoles.user,
  routes: [
    {
      path: "/payment",
      component: Payment,
      exact: true,
    },
    {
      path: "/payment/:sessionId",
      component: Payment,
      exact: true,
    },
  ],
};
export default PaymentRoutes;

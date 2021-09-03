import Home from ".";
import authRoles from "../../config/authRoles";
const MyOrderRoutes = {
  auth: authRoles.user,
  routes: [
    {
      path: "/myorders",
      component: Home,
      exact: true,
    },
  ],
};
export default MyOrderRoutes;

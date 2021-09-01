import Home from ".";
import authRoles from "../../config/authRoles";
const HomeRoutes = {
  auth: authRoles.guest,
  routes: [
    {
      path: "/home",
      component: Home,
      exact: true,
    },
  ],
};
export default HomeRoutes;

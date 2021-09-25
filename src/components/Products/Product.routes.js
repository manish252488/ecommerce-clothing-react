import Home from ".";
import authRoles from "../../config/authRoles";
const ProductRoutes = {
  auth: authRoles.guest,
  routes: [
    {
      path: "/products",
      component: Home,
      exact: true,
    },
  ],
};
export default ProductRoutes;

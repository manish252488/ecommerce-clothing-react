
import Component from ".";
import authRoles from "../../config/authRoles";
const ProductDetailRoutes = {
  auth: authRoles.guest,
  routes: [
    {
        path: "/product-detail/:productId",
        component: Component,
    },
  ],
};
export default ProductDetailRoutes;

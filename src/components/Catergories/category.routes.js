import Component from ".";
import authRoles from "../../config/authRoles";
const CategoryRoutes = {
  auth: authRoles.guest,
  routes: [
    {
      path: "/categories",
      component: Component,
      exact: true,
    },
  ],
};
export default CategoryRoutes;

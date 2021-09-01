
import Component from ".";
import authRoles from "../../config/authRoles";
const AboutRoutes = {
  auth: authRoles.guest,
  routes: [
    {
      path: "/about",
      component: Component,
      exact: true,
    },
  ],
};
export default AboutRoutes;

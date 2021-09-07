
import Component from ".";
import authRoles from "../../config/authRoles";
const ContactRoutes = {
  auth: authRoles.guest,
  routes: [
    {
      path: "/contact-support",
      component: Component,
      exact: true,
    },
  ],
};
export default ContactRoutes;

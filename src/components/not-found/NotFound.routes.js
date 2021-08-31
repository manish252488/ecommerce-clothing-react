const { default: authRoles } = require("../../config/authRoles");
const { default: NotFound } = require("./NotFound");

const NotFoundRoutes = {
  auth: authRoles.guest,
  routes: [
    {
      path: "/404",
      exact: true,
      component: NotFound,
    },
  ],
};
export default NotFoundRoutes;

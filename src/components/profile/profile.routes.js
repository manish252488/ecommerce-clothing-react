import Profile from ".";
import authRoles from "../../config/authRoles";
const ProfileRoutes = {
  auth: authRoles.guest,
  routes: [
    {
      path: "/profile/:userId",
      component: Profile,
      exact: true,
    },
    {
        path: "/profile",
        component: Profile,
        exact: true,
      },
  ],
};
export default ProfileRoutes;

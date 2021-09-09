import authRoles from "../../config/authRoles";
import PrivacyPolicies from "./PrivacyPolicies";
import TermsAndPolicy from "./TermsofServices";
const ProfileRoutes = {
    auth: authRoles.guest,
    routes: [
        {
            path: "/terms-of-use",
            component: PrivacyPolicies,
            exact: true,
        },
        {
            path: "/privacy-policies",
            component: TermsAndPolicy,
            exact: true,
        },
    ],
};
export default ProfileRoutes;

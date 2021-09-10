import authRoles from "../../config/authRoles";
import PrivacyPolicies from "./PrivacyPolicies";
import TermsofServices from "./TermsofServices";
const ProfileRoutes = {
    auth: authRoles.guest,
    routes: [
        {
            path: "/terms-of-use",
            component: TermsofServices,
            exact: true,
        },
        {
            path: "/privacy-policies",
            component: PrivacyPolicies,
            exact: true,
        },
    ],
};
export default ProfileRoutes;

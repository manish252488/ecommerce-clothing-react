import HomeRoutes from "../components/home/Home.routes";
import NotFoundRoutes from "../components/not-found/NotFound.routes";
import PaymentRoutes from "../components/Payment/payment.routes";
import ContactRoutes from '../components/Contacts/contacts.routes'
import ProductDetailRoutes from "../components/ProductDetails/ProductDetail.routes";
import AboutRoutes from "../components/About/about.routes";
import AuthRoutes from "../components/Login/auth.routes";
import CheckoutRoutes from "../components/CheckoutPage/checkout.routes";
import MyOrderRoutes from "../components/MyOrders/myorders.routes";
import ProfileRoutes from "../components/profile/profile.routes";
import TermsAndPolicies from "../components/TermsAndPrivacy/termsandprivacy.routes";
import CategoryRoutes from "../components/Catergories/category.routes";

const routesConfig = [HomeRoutes,
    NotFoundRoutes,
    PaymentRoutes,
    ContactRoutes,
    ProductDetailRoutes,
    AboutRoutes,
    AuthRoutes,
    CheckoutRoutes,
    MyOrderRoutes,
    ProfileRoutes,
    TermsAndPolicies,
    CategoryRoutes
];

export default routesConfig;

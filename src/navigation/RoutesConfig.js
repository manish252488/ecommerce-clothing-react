import AdminRoutes from "../components/admin/Admin.routes";
import HomeRoutes from "../components/home/Home.routes";
import NotFoundRoutes from "../components/not-found/NotFound.routes";
import PaymentRoutes from "../components/Payment/payment.routes";
import ContactRoutes from '../components/Contacts/contacts.routes'
import ProductDetailRoutes from "../components/ProductDetails/ProductDetail.routes";
import AboutRoutes from "../components/About/about.routes";
import AuthRoutes from "../components/Login/auth.routes";

const routesConfig = [HomeRoutes, AdminRoutes,NotFoundRoutes, PaymentRoutes, ContactRoutes,ProductDetailRoutes, AboutRoutes, AuthRoutes];

export default routesConfig;

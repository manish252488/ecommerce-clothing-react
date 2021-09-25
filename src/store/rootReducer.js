import { combineReducers } from "redux";
import AdminReducer from "./reducers/AdminReducer";
import AuthReducer from "./reducers/AuthReducer";
import ChatReducer from "./reducers/ChatReducer";

import LanguageReducers from "./reducers/languageReducers";
import MessageBarReducer from "./reducers/MessageBarReducer";
import OrderReducers from "./reducers/OrdersReducer";
import ProductsReducer from "./reducers/ProductsReducer";
import OffersReducers from "./reducers/OfferReducers";
const createReducer = (asyncReducers) =>
  combineReducers({
    MessageBar: MessageBarReducer,
    Auth: AuthReducer,
    Chat: ChatReducer,
    admin: AdminReducer,
    language: LanguageReducers,
    products: ProductsReducer,
    offers: OffersReducers,
    orders: OrderReducers,
    ...asyncReducers,
  });

export default createReducer;

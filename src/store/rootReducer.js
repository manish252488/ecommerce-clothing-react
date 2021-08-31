import { combineReducers } from "redux";
import AdminReducer from "./reducers/AdminReducer";
import AuthReducer from "./reducers/AuthReducer";
import ChatReducer from "./reducers/ChatReducer";

import LanguageReducers from "./reducers/languageReducers";
import MessageBarReducer from "./reducers/MessageBarReducer";
const createReducer = (asyncReducers) =>
  combineReducers({
    MessageBar: MessageBarReducer,
    Auth: AuthReducer,
    Chat: ChatReducer,
    admin: AdminReducer,
    language: LanguageReducers,
    ...asyncReducers,
  });

export default createReducer;

import {
  SET_USER,
  SIGN_OUT,
  SET_MAIL_ACCOUNT,
  REMOVE_MAIL_ACCOUNT,
  HIDE_AUTH,
  SHOW_AUTH,
  CART_ACTION,
} from "../actions/actionTypes";

const initialState = {
  user: {},
  token: "",
  isAuthenticated: false,
  role: "guest",
  mailAccount: {},
  showAuthPage: true,
  cart: [],
  billingData: null
};
function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token ? action.payload.token : state.token,
        isAuthenticated: true,
        role: action.payload.user.roleId,
      };
    case SIGN_OUT:
      return {
        ...initialState,
      };
    case SET_MAIL_ACCOUNT:
      return {
        ...state,
        mailAccount: action.payload,
      };
    case REMOVE_MAIL_ACCOUNT:
      return {
        ...initialState,
      };
    case SHOW_AUTH: 
      return {
        ...state,
        showAuthPage: true
      }
    case HIDE_AUTH:
      return {
        ...state,
        showAuthPage: false
      }
      case CART_ACTION: 
      return {
        ...state,
        cart: action.payload.cart,
        billingData: action.payload.billingData
      }
    default:
      return state;
  }
}
export default AuthReducer;

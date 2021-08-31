import { CHANGE_LANG, SET_LANG } from "../actions/actionTypes";

const initialState = {
  languages: [],
  selected: "en",
};
function LanguageReducers(state = initialState, action) {
  switch (action.type) {
    case SET_LANG:
      return {
        ...state,
        languages: action.payload,
      };
    case CHANGE_LANG:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
}
export default LanguageReducers;

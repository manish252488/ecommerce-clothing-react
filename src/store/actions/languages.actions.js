import { SET_LANG, CHANGE_LANG } from "./actionTypes";

export const setLanguages = (lang = []) => {
  return (dispatch) =>
    dispatch({
      type: SET_LANG,
      payload: lang,
    });
};
export const changeLang = (lang = "en") => {
  return (dispatch) =>
    dispatch({
      type: CHANGE_LANG,
      payload: lang,
    });
};

import React from "react";
import { useDispatch } from "react-redux";
import History from "../../@history";
import * as Actions from "../../store/actions";
const SignOut = (props) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(Actions.signOut(()=> History.push('/')));
  };
  return (
    <div onClick={logout}>{props.children ? props.children : "logout"}</div>
  );
};
export default SignOut;

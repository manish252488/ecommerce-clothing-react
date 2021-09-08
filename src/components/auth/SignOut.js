import React from "react";
import { useDispatch } from "react-redux";
import History from "../../@history";
import * as Actions from "../../store/actions";
const SignOut = (props) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(Actions.signOut(()=> History.goBack()));
  };
  return (
    <div style={{width: "100%", display:'flex',alignItems: 'center'}} onClick={logout}>{props.children ? props.children : "logout"}</div>
  );
};
export default SignOut;

import { Button, Chip, CircularProgress, Grid, Link, TextField, Typography } from "@material-ui/core";
import GoogleLogin from "react-google-login";
import { Facebook } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./index.less";
import * as actions from "../../store/actions";
import { setMailAccount } from "../../store/actions";
import constants from "../../config/constants";
import History from "../../@history";
const Login = (props) => {
  const [password, setPassword] = useState("");
  const [email, changeEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const validate = () => {
    let flag = true;
    let err = {};
    setErrors({ email: "", password: "" });
    if (email === "") {
      err.email = "email cannot be empty!";
      flag = false;
    }
    if (password === "") {
      err.password = "password cannot be empty!";
      flag = false;
    }
    setErrors({ ...err });
    return flag;
  };
  const onSuccess = (path) => {
    setLoading(false);
    History.replace('/home')
  };
  const onFailure = (error) => {
    setLoading(false);
    setError(error);
  };
  const login = () => {
    setError("");
    if (validate()) {
      setLoading(true);
      dispatch(
        actions.login(
          { email: email, password: password },
          onSuccess,
          onFailure
        )
      );
    }
  };
  const socialLogin = (data, source = "facebook" || "google") => {
    if (source === "google") {
      dispatch(
        actions.login(
          { email: data.profileObj.email, password: data.profileObj.googleId },
          onSuccess,
          onFailure
        )
      );
      dispatch(setMailAccount(data.tokenObj));
    }
  };
  return (
    <div className="loginPanel">
      <Typography color="error">{error}</Typography>
      <TextField
        type="email"
        variant="outlined"
        color="primary"
        defaultValue={email}
        label="Email *"
        fullWidth
        onChange={(ev) => changeEmail(ev.target.value)}
        helperText={errors.email}
      />
      <TextField
        type="password"
        variant="outlined"
        color="primary"
        defaultValue={password}
        label="Password *"
        fullWidth
        onChange={(ev) => setPassword(ev.target.value)}
        helperText={errors.password}
      />
      <Button
        startIcon={loading && <CircularProgress size={20} color="secondary" />}
        variant="contained"
        color="primary"
        onClick={login}
        fullWidth
      >
        Login
      </Button>

      <Grid container>
        <Grid item xs={8}>
          <Link href="#" color="primary" variant="body2">
            Forgot password?
          </Link>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" className="or-divider">
        <Grid item xs={1}>
          <Typography color="primary">OR</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={8}>
        <div className="social-logins">
          <GoogleLogin
            clientId={constants.google_client_id}
            buttonText="Login with Google"
            onSuccess={(data) => socialLogin(data, "google")}
            onFailure={(err) => onFailure(err.message)}
            cookiePolicy={"single_host_origin"}
            autoLoad={false}
            render={() => <Chip avatar={<Facebook />} label="Google" clickable/>}
            prompt={"select_account"}
            discoveryDocs="https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"
            scope="https://www.googleapis.com/auth/gmail.readonly"
          />
          {/* <Chip avatar={<Facebook />} label="Facebook" clickable onClick={socialLogin}/>
        <Chip avatar={<Instagram />} label="Instagram" clickable onClick={socialLogin}/> */}
          </div>
        </Grid>
      </Grid>
      </div>
  );
};
export default Login;

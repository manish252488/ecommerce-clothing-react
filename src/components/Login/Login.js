import { Button, CircularProgress, Grid, Link, TextField, Typography } from "@material-ui/core";
import GoogleLogin from "react-google-login";
import { Facebook } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./index.less";
import * as actions from "../../store/actions";
import constants from "../../config/constants";
import History from "../../@history";
import ReactFacebookLogin from "react-facebook-login";
const Login = ({changeTab}) => {
  const [password, setPassword] = useState("");
  const [email, changeEmail] = useState("");
  const [, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ , setFacebookLoading] = useState(false)
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
  const onSuccess = () => {
    setLoading(false);
    History.goBack()
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
    console.log(source, data)
  };
  return (
    <div className="loginPanel">
      <Typography variant="h5">Log In</Typography>
      <TextField
        type="email"
        variant="outlined"
        color="primary"
        defaultValue={email}
        label="Email *"
        fullWidth
        size="small"
        onChange={(ev) => changeEmail(ev.target.value)}
        helperText={errors.email}
      />
      <TextField
        type="password"
        size="small"
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
        size="small"
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
      <Grid container justifyContent="flex-end" className="or-divider">
        <Grid item xs={6} style={{textAlign: 'right'}}>
          <Link onClick={changeTab}>Create an account!</Link>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <div className="social-logins">
            <GoogleLogin
              uxMode="redirect"
              clientId={constants.google_client_id}
              buttonText="Login with Google"
              onSuccess={(data) => socialLogin(data, "google")}
              onFailure={(err) => onFailure(err.message)}
              cookiePolicy={"single_host_origin"}
              autoLoad={false}
              redirectUri={constants.login_redirects}
              className="google-login"
              prompt={"select_account"}
              discoveryDocs="https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"
              scope="https://www.googleapis.com/auth/gmail.readonly"
            />
            <ReactFacebookLogin
              appId={constants.facebook_app_id}
              autoLoad={false}
              fields="name,email,picture"
              onClick={() => setFacebookLoading(true)}
              cssClass="facebook-login"
              icon={<Facebook style={{ marginRight: 13 }} />}
              callback={(res) => socialLogin(res, 'facebook')} />,
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default Login;

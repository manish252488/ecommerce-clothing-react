import { Button, CircularProgress, Grid, Link, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./index.less";
import * as actions from "../../store/actions";
import History from "../../@history";
import { deviceDetect } from "react-device-detect";
import { showMessageBar } from "../../store/actions";
const Login = ({ changeTab }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down("md"))
  const [password, setPassword] = useState("");
  const [email, changeEmail] = useState("");
  const [, setError] = useState("");
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
  const onSuccess = () => {
    setLoading(false);
    History.goBack()
  };
  const onFailure = (error) => {
    setLoading(false);
    console.log(error)
    dispatch(showMessageBar("error", error))
  };
  const login = () => {
    const deviceData = deviceDetect();
    setError("");
    if (validate()) {
      setLoading(true);
      dispatch(
        actions.login(
          { email: email, password: password, deviceData: deviceData },
          onSuccess,
          onFailure
        )
      );
    }
  };
  return (
    <div className="loginPanel">
      <form>
      <Typography variant="h5">Log In</Typography>
      <TextField
        variant="outlined"
        color="primary"
        defaultValue={email}
        label="Email/Mobile No *"
        autoComplete="username"
        fullWidth
        type="tel" 
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
        autoComplete="current-password"
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
      </form>
      <Grid container>
        <Grid item xs={8}>
          <Link href="#" color="primary" variant="body2">
            Forgot password?
          </Link>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" className="or-divider">
        <Grid item xs={matches ? 12 : 6} style={{ textAlign: 'right' }}>
          <Link onClick={() => History.push("/signup")}>Create an account!</Link>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
         </Grid>
      </Grid>
    </div>
  );
};
export default Login;

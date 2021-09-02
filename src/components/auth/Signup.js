import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authPage, setMailAccount, signUp } from "../../store/actions";
import "./index.less";
import GoogleLogin from "react-google-login";
import constants from "../../config/constants";
import { Facebook } from "@material-ui/icons";
/**
 * 
 *  "name": "manish singh",
    "email": "manish@gmail.com",
    "password": "123456",
    "source": "sso",
    "picture": "http://somepicture.com",
    "roleId": 1
 * 
 */
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        password1: "",
        password2: "",
        picture: null,
      },
      errors: {
        main: "",
        name: "",
        email: "",
        password1: "",
        password2: "",
      },
      loading: false,
      checked: false,
    };
  }
  onChange = (key, value) => {
    this.setState((prev) => {
      return {
        ...prev,
        user: {
          ...prev.user,
          [key]: value,
        },
      };
    });
  };
  validate = () => {
    const { user } = this.state;
    let flag = true;
    let err = {};
    if (user.name === "") {
      err.name = "name cannot be empty!";
      flag = false;
    }
    if (user.email === "") {
      err.email = "email cannot be empty!";
      flag = false;
    }
    if (user.password1 === "") {
      err.password1 = "password cannot be empty!";
      flag = false;
    }
    if (user.password2 === "") {
      err.password2 = "password cannot be empty!";
      flag = false;
    }
    if (user.password1 !== user.password2) {
      err.main = "passwords do not match!";
      flag = false;
    }
    this.setState({ errors: err });
    return flag;
  };
  onSuccess = (path) => {
    this.setState({ loading: false });
    this.props.authPage(false);
  };
  onFailure = (msg) => {
    this.setState((prev) => {
      return {
        ...prev,
        loading: false,
        errors: {
          ...prev.errors,
          main: msg,
        },
      };
    });
  };
  register = () => {
    const { user } = this.state;
    this.setState({
      loading: true,
      errors: {
        main: "",
        name: "",
        email: "",
        password1: "",
        password2: "",
      },
    });
    if (this.validate()) {
      let data = {
        name: user.name,
        password: user.password1,
        email: user.email,
        roleId: 1,
        source: this.state.user.source || "form",
        picture: this.state.user.picture ? this.state.user.picture : null,
        marketingNotification: this.state.checked
      };
      this.props.register(data, this.onSuccess, this.onFailure);
    } else {
      this.setState({ loading: false });
    }
  };
  handleChangeCheckbox = (e) => {
    this.setState({ checked: e.target.checked });
  };
  socialRegister = (data, type = "facebook" || "google") => {
    if (type === "google") {
      this.setState({
        user: {
          name: data.profileObj.givenName + " " + data.profileObj.familyName,
          email: data.profileObj.email,
          password1: data.profileObj.googleId,
          password2: data.profileObj.googleId,
          picture: data.profileObj.imageUrl,
          source: type,
          marketingNotification: true
        },
      });
    }
    this.props.setMailAccount(data.tokenObj);
    this.register();
  };
  render() {
    const { user, errors, loading, checked } = this.state;
    return (
      <div className="signup-form">
        <Typography color="error">{errors.main}</Typography>
        <TextField
          variant="outlined"
          color="primary"
          defaultValue={user.name}
          label="Full name"
          fullWidth
          onChange={(ev) => this.onChange("name", ev.target.value)}
          helperText={errors.name}
        />
        <TextField
          type="email"
          variant="outlined"
          color="primary"
          defaultValue={user.email}
          label="Email"
          fullWidth
          onChange={(ev) => this.onChange("email", ev.target.value)}
          helperText={errors.email}
        />

        <TextField
          variant="outlined"
          color="primary"
          defaultValue={user.password1}
          label="Password"
          fullWidth
          onChange={(ev) => this.onChange("password1", ev.target.value)}
          helperText={errors.password1}
        />
        <TextField
          variant="outlined"
          color="primary"
          defaultValue={user.password2}
          label="Re-Enter you password"
          fullWidth
          onChange={(ev) => this.onChange("password2", ev.target.value)}
          helperText={errors.password2}
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={checked}
              onChange={this.handleChangeCheckbox}
            />
          }
          label="I want to receive inspiration, marketing promotions and updates via email."
        />
        <Button
          startIcon={
            loading && <CircularProgress size={20} color="secondary" />
          }
          variant="contained"
          color="primary"
          onClick={this.register}
          fullWidth
          disabled={!checked}
        >
          Register
        </Button>
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
            onSuccess={(data) => this.socialRegister(data, "google")}
              onFailure={(err) => this.onFailure(err.message)}
              cookiePolicy={"single_host_origin"}
              autoLoad={false}
            render={() => <Chip avatar={<Facebook />} label="Google" clickable/>}
            prompt={"select_account"}
            discoveryDocs="https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"
            scope="https://www.googleapis.com/auth/gmail.readonly"
          />
          </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  register: bindActionCreators(signUp, dispatch),
  setMailAccount: bindActionCreators(setMailAccount, dispatch),
  authPage: bindActionCreators(authPage, dispatch)
});
export default connect(null, mapDispatchToProps)(SignUp);

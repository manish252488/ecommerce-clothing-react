import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authPage, setMailAccount, signUp } from "../../store/actions";
import "./index.less";
import History from "../../@history";
import PhoneAndEmail from "../common/PhoneAndEmail";
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        lname: "",
        email: "",
        password1: "",
        password2: "",
        picture: null,
        phoneNo: "",
        birthdate: ''
      },
      errors: {
        main: "",
        lname: "",
        name: "",
        email: "",
        password1: "",
        password2: "",
        phoneNo: '',
      },
      loading: false,
      checked: false,
      type: 1
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
    if (user.lname === "") {
      err.lname = "name cannot be empty!";
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
      err.password1 = "passwords do not match!";
      err.password2 = "passwords do not match!";
      flag = false;
    }
    if (user.phoneNo === "") {
      err.phoneNo = "phoneNo cannot be empty!";
      flag = false;
    }
    this.setState({ errors: err });
    return flag;
  };
  onSuccess = (path) => {
    this.setState({ loading: false });
    History.push('/home')

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
      ...this.state,
      loading: true,
      errors: {
        main: "",
        name: "",
        email: "",
        password1: "",
        password2: "",
        phoneNo: ""
      },
    });
    if (this.validate()) {
      let data = {
        name: user.name,
        password: user.password1,
        email: user.email,
        roleId: 1,
        phoneNo: this.state.user.phoneNo,
        source: this.state.user.source || "form",
        picture: this.state.user.picture ? this.state.user.picture : null,
        marketingNotification: this.state.checked,
      };
      console.log(data)
      this.props.register(data, this.onSuccess, this.onFailure);
    } else {
      this.setState({ loading: false });
    }
  };
  handleChangeCheckbox = (e) => {
    this.setState({ checked: e.target.checked });
  };
  changeTab = (tab) => {
    this.setState({type: tab})
  }
  render() {
    const { user, errors, loading, checked } = this.state;
    return (
      <div className="signup-form">
        <Typography variant="h5">
          Start your Registration
        </Typography>
        {
          this.state.type === 2 && <PhoneAndEmail
          buttonText="Proceed"
          email={user.email}
          errors={this.state.errors}
          phone={user.phoneNo}
          onChange={this.onChange}
          setAction={() => this.changeTab(2)}/>
        }
        {this.state.type === 1 && <>
          <TextField
            variant="outlined"
            color="primary"
            defaultValue={user.name}
            label="First name"
            fullWidth
            onChange={(ev) => this.onChange("name", ev.target.value)}
            helperText={errors.name}
            size="small"
          />
          <TextField
            variant="outlined"
            color="primary"
            defaultValue={user.lname}
            label="Last name"
            fullWidth
            onChange={(ev) => this.onChange("lname", ev.target.value)}
            helperText={errors.lname}
            size="small"
          />
          {/* <DatePicker title="Birthday" selectedDate={(res) => this.onChange('birthdate', res)} /> */}
          <TextField
            variant="outlined"
            color="primary"
            defaultValue={user.password1}
            label="Password"
            fullWidth
            onChange={(ev) => this.onChange("password1", ev.target.value)}
            helperText={errors.password1}
            size="small"
          />
          <TextField
            variant="outlined"
            color="primary"
            defaultValue={user.password2}
            label="Re-Enter you password"
            fullWidth
            onChange={(ev) => this.onChange("password2", ev.target.value)}
            helperText={errors.password2}
            size="small"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                defaultChecked={checked}
                onChange={this.handleChangeCheckbox}
              />
            }
            label={<Typography>I agree to the&nbsp;{<Link target="_blank" href="/terms-policies">terms and policies.</Link>}</Typography>}
          />
          <Button
            startIcon={
              loading && <CircularProgress size={20} color="secondary" />
            }
            variant="contained"
            color="secondary"
            onClick={this.register}
            fullWidth
            disabled={!checked}
          >
            Register
          </Button>
        </>}
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

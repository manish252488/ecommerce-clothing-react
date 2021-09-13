import {
  Button,
  CircularProgress,
  Divider,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authPage, setMailAccount, showMessageBar, signUp } from "../../store/actions";
import "./index.less";
import History from "../../@history";
import PhoneAndEmail from "../common/PhoneAndEmail";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SocialLinks } from "../../config/constants/constants";
import { deviceDetect } from 'react-device-detect'
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        lname: "",
        password1: "",
        password2: "",
        phoneNo: "",
        birthdate: new Date()
      },
      errors: {
        main: "",
        lname: "",
        name: "",
        password1: "",
        password2: "",
      },
      loading: false,
      type: 1
    };
  }
  componentDidUpdate(){
    if(this.state.type === 2 && this.state.user.phoneNo === ""){
      this.setState({type: 1})
    }
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
    if(!this.validatePassword(user.password1,"password1")){
      flag=false;
    }
    if(!this.validatePassword(user.password2,"password2")){
      flag=false;
    }
    if (user.phoneNo === "") {
      err.phoneNo = "phoneNo cannot be empty!";
      alert("movi;")
      flag = false;
    }
    this.setState({ errors: err });
    return flag;
  };

  validatePassword = (val,type) => {
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      this.setState({errors: {[type]: ""}})
    if(regularExpression.test(val)){
      return true
    }else {
      let password1 = "Use 1 uppercase and 1 special character and number!";
      this.setState({errors: {[type]: password1}})
      return false
    }
  }

  onSuccess = (path) => {
    this.setState({ loading: false });
    this.props.showMessageBar("success", "Registeration Successfull!")
    History.goBack()
  };
  onFailure = (msg) => {
    this.props.showMessageBar("error", msg)
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
    const deviceData = deviceDetect()
    this.setState({
      ...this.state,
      loading: true,
      errors: {
        main: "",
        name: "",
        password1: "",
        password2: "",
        phoneNo: ""
      },
    });
    if (this.validate()) {
      let data = {
        name: user.name + ' ' + user.lname,
        password: user.password1,
        phoneNo: this.state.user.phoneNo,
        source: SocialLinks.signinOptions.mobile,
        marketingNotification: this.state.checked,
        deviceData: deviceData,
        birthdate: this.state.user.birthdate,
      };
      this.props.register(data, this.onSuccess, this.onFailure);
    } else {
      this.setState({ loading: false });
    }
  };

  changeTab = (tab) => {
    this.setState({ type: tab })
  }
  render() {
    const { user, errors, loading } = this.state;
    return (
      <div className="signup-form">
       
        {
          this.state.type === 1 && <PhoneAndEmail
            buttonText="Proceed"
            phone={user.phoneNo}
            onChange={this.onChange}
            setAction={this.changeTab} />
        }
        {this.state.type === 2 && <>
          <Typography variant="h6">
          Welcome {user.phoneNo}, what's your name?
        </Typography>
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
          <Typography variant="subtitle1" style={{fontSize: 12, marginTop: 15,marginLeft: 10, color: "rgba(0, 0, 0, 0.54)"}}>Birthdate</Typography>
          <DatePicker
            name="date"
            maxDate={new Date()}
            className="date-picker"
            dateFormat="dd/MM/yyyy"
            selected={user.birthdate}
            onSelect={(date) => this.onChange("birthdate", date)} //when day is clicked
            onChange={(date) => this.onChange("birthdate", date)} //only when value has changed
          />

          <TextField
            variant="outlined"
            color="primary"
            defaultValue={user.password1}
            label="Password"
            onBlur={(ev) => this.validatePassword(ev.target.value, "password1")}
            autoComplete="new-password"
            fullWidth
            onChange={(ev) => this.onChange("password1", ev.target.value)}
            helperText={errors.password1}
            size="small"
          />
          <TextField
            variant="outlined"
            color="primary"
            defaultValue={user.password2}
            onBlur={(ev) => this.validatePassword(ev.target.value, "password2")}
            label="Re-Enter you password"
            autoComplete="new-password"
            fullWidth
            onChange={(ev) => this.onChange("password2", ev.target.value)}
            helperText={errors.password2}
            size="small"
          />
          <Button
            startIcon={
              loading && <CircularProgress size={20} color="secondary" />
            }
            variant="contained"
            color="primary"
            onClick={this.register}
            fullWidth
          >
            Register
          </Button>
         
        </>}
        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          <Link onClick={() => History.push("/login")}>already a user? LOG IN</Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  register: bindActionCreators(signUp, dispatch),
  setMailAccount: bindActionCreators(setMailAccount, dispatch),
  authPage: bindActionCreators(authPage, dispatch),
  showMessageBar: bindActionCreators(showMessageBar,dispatch)
});
export default connect(null, mapDispatchToProps)(SignUp);

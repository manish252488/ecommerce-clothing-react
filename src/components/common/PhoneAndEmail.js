import { Button, Checkbox, CircularProgress, Divider, FormControl, FormControlLabel, FormHelperText, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Auth from '../../api/auth';
import OtpInput from 'react-otp-input';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    marginTop: theme.spacing(4),
  },
  position: {
    marginLeft: 12,
    marginTop: -6
  },
  error: {
    color: "red",
    textTransform: 'capitalize'
  }
}));
const webInput = { padding: 10, width: 40, margin: 5, outlineColor: "#de6262" }
const mobileInput = { padding: 5, width: 30, margin: 5,borderWidth: 1,borderColor:"#de6262", outlineColor: "#de6262", fontSize: 18 }
export default function PhoneAndEmail({ phone, onChange = () => { }, setAction = () => { }, buttonText }) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down("md"))
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);
  const [hash, sethash] = useState(null);
  const [phoneNo, setPhoneNumber] = useState(phone);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [otp, setOtp] = useState("");
  const [responseMessage, setResponseMessage] = useState(null)
  useEffect(() => {
    onChange("phoneNo", phoneNo)
  }, [phoneNo])
  useEffect(() => {
    setResponseMessage(null)
    setError(null)
  }, [otp])
  const handleChangeCheckbox = (e) => {
    setChecked(e.target.checked);
  };
  const CheckIndianNumber = (b) => {
    var a = /^\d{10}$/;
    if (b) {
      setError(null)
      if (a.test(b)) {
        setInputDisabled(true)
        setLoading(true)
        Auth.generateOtp(phoneNo).then(res => {
          if (res.data && res.data.otp) {
            sethash(res.data.otp)
            setResponseMessage(res.message)
          } else {
            setError(res.message)
            setInputDisabled(false)
          }
          setLoading(false)
        }).catch(err => {
          console.log("errr", err)
          setLoading(false)
          setError(err.message)
          setInputDisabled(false)
        })
      }
      else {
        //not valid
        setError("Number not Valid.Please check your number!")
      }
    }
  };

  const verify = () => {
    const otpval = /^\d{6}$/
    setError(null)
    setLoading(true)
    if (otp && otpval.test(otp)) {
      Auth.verifyOtp(otp, hash).then(res => {
        setLoading(false)
        if (res.data && res.data.status) {
          // otp verified
          setAction(2)
        } else {
          setError(res.data)
        }
      }).catch(err => {
        setLoading(false)
        setError(err.message)
      })
    } else {
      setError("OTP not Valid!")
    }
  }
  const ChangeNo = () => {
    setError(null)
    setResponseMessage(null)
    setOtp(null)
    setPhoneNumber(null)
    sethash(null);
    setInputDisabled(false)
  }
  const validate = () => {
    if (error === null && phoneNo && phoneNo !== "") {
      return true
    } else return false
  }
  const validateOtp = () => {
    if (hash && hash !== "" && otp && checked) {
      return true
    } else {
      return false
    }
  }
  return <>
    <Typography variant="h5">
      Verify your Mobile Number to continue.
    </Typography>
    {hash && <Link onClick={ChangeNo}>change no? {phone}</Link>}
    <Divider style={{ marginTop: 8, marginBottom: 15 }} />
    {!hash && <><FormControl
      size="small"
      fullWidth
      className={clsx(classes.margin, classes.textField)}
    >
      <InputLabel
        className={classes.position} htmlFor="outlined-adornment-amount">Mobile No.</InputLabel>
      <OutlinedInput
        type="tel" 
        value={phoneNo}
        inputProps={{ maxLength: 10, inputMode: "numeric" }}
        onFocus={() => setError(null)}
        onChange={(ev) => setPhoneNumber(ev.target.value)}
        onBlur={(ev) => CheckIndianNumber(ev.target.value)}
        startAdornment={<InputAdornment position="start">+91</InputAdornment>}
        endAdornment={loading ? <InputAdornment position="end"><CircularProgress size={20} /></InputAdornment> : <></>}
        labelWidth={70}
        disabled={inputDisabled}
      />
      <FormHelperText style={{ color: 'red' }}>{error}</FormHelperText>
    </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={() => CheckIndianNumber(phone)}
        fullWidth
        size="small"
        disabled={!validate() || loading}
      >
        {buttonText}
      </Button></>

    }
    {
      hash && (<>
        <OtpInput
          shouldAutoFocus={true}
          inputStyle={matches ? mobileInput : webInput}
          value={otp}
          onChange={(val) => setOtp(val)}
          numInputs={6}
          separator={<span>-</span>}
        />
        <Typography style={{ marginLeft: 5 }} variant="h6" className={error ? classes.error : ""}>
          {error || responseMessage}
        </Typography>
        <Link style={{ marginTop: 10 }} onClick={() => CheckIndianNumber(phone)}>RESEND OTP</Link>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              defaultChecked={checked}
              onChange={handleChangeCheckbox}
            />
          }
          label={<Typography>By continuing, you agree to DapperFolks's{<Link target="_blank" href="/terms-of-use">Terms of Use</Link>}and
            <Link target="_blank" href="/privacy-policies">Privacy Policy</Link>
          </Typography>}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={verify}
          fullWidth
          size="small"
        startIcon={loading ? <CircularProgress color="secondary" size={15} /> : <></>}

          disabled={!(validate() === true && validateOtp() === true ) }
        >
          {'Verify'}
        </Button>
      </>)
    }
  </>
}
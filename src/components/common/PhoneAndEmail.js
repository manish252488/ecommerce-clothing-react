import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Auth from '../../api/auth';
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
  textField: {
  },
}));

export default function PhoneAndEmail({ phone, onChange = () => { }, setAction = () => { }, buttonText }) {
  const classes = useStyles()
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
    const otpval= /^\d{6}$/
    setError(null)
    setLoading(true)
    if(otp && otpval.test(otp)){
      Auth.verifyOtp(otp, hash).then(res=> {
        setLoading(false)
        if(res.data && res.data.status){
          // otp verified
          setAction(2)
        }else {
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
  const validate = () => {
    if (error === null && checked && phoneNo && phoneNo !== "" && hash && hash !== "" && otp) {
      return false
    } else return true
  }
  return <>
   <Typography variant="h6">
          Verify your Mobile Number to continue.
        </Typography>
    {!hash && <FormControl
      size="small"
      fullWidth
      className={clsx(classes.margin, classes.textField)}
    >
      <InputLabel
        className={classes.position} htmlFor="outlined-adornment-amount">Mobile No.</InputLabel>
      <OutlinedInput
        value={phoneNo}
        onFocus={() => setError(null)}
        onChange={(ev) => setPhoneNumber(ev.target.value)}
        onBlur={(ev) => CheckIndianNumber(ev.target.value)}
        startAdornment={<InputAdornment position="start">+91</InputAdornment>}
        endAdornment={loading ? <InputAdornment><CircularProgress size={20} /></InputAdornment> : <></>}
        labelWidth={70}
        disabled={inputDisabled}
      />
      <FormHelperText style={{ color: 'red' }}>{error}</FormHelperText>
    </FormControl>}
    {
      hash && (<>
        <FormControl
          size="small"
          fullWidth
          className={clsx(classes.margin, classes.textField)}
        >
          <InputLabel
            className={classes.position} htmlFor="outlined-adornment-amount">Enter OTP</InputLabel>
          <OutlinedInput
            value={otp}
            onFocus={() => setError(null)}
            onChange={(ev) => setOtp(ev.target.value)}
            endAdornment={loading ? <InputAdornment><CircularProgress size={20} /></InputAdornment> : <></>}
            labelWidth={70}
          />
          <FormHelperText style={{ color: 'red' }}>{error}</FormHelperText>
        </FormControl>
        <Typography variant="h6">
          {responseMessage}
        </Typography>
     </> )
    }
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
      disabled={validate()}
    >
      {!hash ? buttonText : 'Verify'}
    </Button>
  </>
}
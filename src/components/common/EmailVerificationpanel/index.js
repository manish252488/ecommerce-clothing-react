import { Button, CircularProgress, Divider, FormControl, FormHelperText, InputAdornment, InputLabel, Link, OutlinedInput, Typography, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import EmailIcon from '@material-ui/icons/Email';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Auth from '../../../api/auth';
import OtpInput from 'react-otp-input';
import './index.less'
const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        margin: 'auto',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexFlow: 'column',
        [theme.breakpoints.down("sm")]:{
            width: '100%'
        }
    },
    margin: {
        marginTop: theme.spacing(1),
    },
    position: {
        marginLeft: 20,
        marginTop: -6,
        color: theme.palette.primary.main
    },
    error: {
        color: "red",
        textTransform: 'capitalize'
    },
    h6: {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
        paddingBottom: 10,
        paddingTop: 10
    }
}));
const webInput = { padding: 10, width: 40, margin: 5, outlineColor: "#de6262" }
const mobileInput = { padding: 5, width: 30, margin: 5, borderWidth: 1, borderColor: "#de6262", outlineColor: "#de6262", fontSize: 18 }
export default function EmailVerificationpanel({onSuccess}) {
    const classes = useStyles()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down("md"))
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hash, sethash] = useState(null);
    const [email, setEmail] = useState();
    const [inputDisabled, setInputDisabled] = useState(false);
    const [otp, setOtp] = useState("");
    const [responseMessage, setResponseMessage] = useState(null)

    useEffect(() => {
        setResponseMessage(null)
        setError(null)
    }, [otp])

    const checkEmail = (b) => {
        if(verifyEmailStructure()){
        setError(null)
        setInputDisabled(true)
        setLoading(true)
        Auth.genrateMailOtp(email).then(res => {
            if (res.data && res.data.otp) {
                sethash(res.data.otp)
                setResponseMessage(res.message)
            } else {
                setError(res.message)
                setInputDisabled(false)
            }
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            setError(err.message)
            setInputDisabled(false)
        })
    } else setError("Email Invalid!")
    }

    const verifyEmail = () => {
        const otpval = /^\d{6}$/
        setError(null)
        setLoading(true)
        if (otp && otpval.test(otp)) {
            Auth.verifyEmailOtp({otp: otp, email: email, hash: hash}).then(res => {
                setLoading(false)
                if (res.data && res.data.status) {
                    if(typeof onSuccess === "function") onSuccess()
                        setResponseMessage(res.message)
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
    const verifyEmailStructure = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase())
    }
    const ChangeEmail = () => {
        setError(null)
        setResponseMessage(null)
        setOtp(null)
        setEmail(null)
        sethash(null);
        setInputDisabled(false)
    }
    const validate = () => {
        if (error === null && email && email !== "") {
            return true
        } else return false
    }
    const validateOtp = () => {
        if (hash && hash !== "" && otp) {
            return true
        } else {
            return false
        }
    }
    return <div className={classes.root}>
        <Typography variant="h6" className={classes.h6}>
           Important! Verify your Email to place an order.
        </Typography>
        {hash && <Link onClick={ChangeEmail}>change Email? {email}</Link>}
        {!hash && <><FormControl
            size="small"
            fullWidth
            className={clsx(classes.margin, classes.textField)}
        >
            <InputLabel
                className={classes.position} htmlFor="outlined-adornment-amount">Email*</InputLabel>
            <OutlinedInput
                type="email"
                value={email}
                inputProps={{ inputMode: "email" }}
                onFocus={() => setError(null)}
                onChange={(ev) => setEmail(ev.target.value)}
                onBlur={(ev) => verifyEmailStructure(ev.target.value)}
                startAdornment={<InputAdornment position="start"><EmailIcon color="primary"/> </InputAdornment>}
                endAdornment={loading ? <InputAdornment position="end"><CircularProgress size={20} /></InputAdornment> : <></>}
                labelWidth={70}
                disabled={inputDisabled}
            />
            <FormHelperText style={{ color: 'red' }}>{error}</FormHelperText>
        </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={() => checkEmail(email)}
                fullWidth
                size="small"
                disabled={!validate() || loading}
            >
                GET OTP
            </Button></>

        }
        {
            hash && (<>
                <OtpInput
                className="check"
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
                <Link style={{ marginTop: 10 }} onClick={() => checkEmail(email)}>RESEND OTP</Link>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={verifyEmail}
                    fullWidth
                    size="small"
                    startIcon={loading ? <CircularProgress color="secondary" size={15} /> : <></>}

                    disabled={!(validate() === true && validateOtp() === true)}
                >
                    {'Verify'}
                </Button>
            </>)
        }
        <Divider style={{ marginTop: 8, marginBottom: 15 }} />

    </div>
}
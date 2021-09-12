import { Button, CircularProgress, Container, makeStyles, TextField, Typography } from '@material-ui/core';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Auth from '../../../api/auth';
import { checkJWT, hideMessageBar, showMessageBar } from '../../../store/actions';
import CountrySelect from '../../common/CountrySelectField';
const useStyles = makeStyles(theme => ({
    container: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        paddingTop: 5,
        paddingBottom: 50
    },
    textField: {
        marginTop: 20
    }
}))
export default function AddressUpdate({success, data}){
    const dispatch = useDispatch()
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [addressForm, setAddressForm] = useState({
        address1: data?.address1 || '',
        address2: data?.address2 || '',
        state: data?.state || '',
        pincode: data?.pincode || '',
        city: data?.city || '',
        country: data?.country || '',
        landmark: data?.landmark || '',
        name: data?.name || '',
        phoneno: data?.phoneno || '',
        type: data?.type || 'Home',
        default: data?.default || false
    })
    const change = (key, ev) => {
        if(key==='country'){
            setAddressForm({ ...addressForm, [key]: ev })
        } else { 
            console.log(ev.target.value)
        setAddressForm({ ...addressForm, [key]: ev.target.value })
        }
    }
    dispatch(hideMessageBar())
    const saveAddress = () => {
        if (validate()) {
            setLoading(true)
            Auth.addAddress(addressForm).then(res => {
                setLoading(false)
                success(false)
                dispatch(checkJWT())
                dispatch(showMessageBar('success', 'Address Saved!'))
            }).catch(err => {
                setLoading(false)
                dispatch(showMessageBar('error', err.message))
            })
        }
    }
    const [errorFields, setErrorFields] = useState({
        address1: '',
        address2: '',
        state: '',
        pincode: '',
        city: '',
        country: '',
        landmark: '',
        name: '',
        type: '',
        phoneno: '',
    })
    const validate = () => {
        let flag = true
        let errors = {}
        let neglect = []
        for (const [key, value] of Object.entries(addressForm)) {
            if ((value === null || value === '') && !neglect.includes(key)) {
                flag = false
                errors[key] = "Cannot be Empty!"
            }else {
                errors[key] = ""
            }
        }
        setErrorFields(errors)
        return flag
    }
    const updateAddress = () => {
        let dataupdate = {
            id: data.id,
            ...addressForm
        }
        if (validate()) {
            setLoading(true)
            Auth.updateAddress(dataupdate).then(res => {
                setLoading(false)
                success(false)
                dispatch(checkJWT())
                dispatch(showMessageBar('success', res.message))
            }).catch(err => {
                setLoading(false)
                dispatch(showMessageBar('error', err.message))
            })
        }
    }
 
    return (
            <Container className={classes.container}>
                <TextField
                    variant="outlined"
                    label="Full Name"
                    placeholder="Full Name"
                    value={addressForm.name}
                    helperText={errorFields.name}
                    className={classes.textField}
                    fullWidth
                    size="small"
                    error={errorFields.name}
                    onChange={value => change('name', value)}
                />
                <TextField
                    variant="outlined"
                    label="Mobile Number"
                    placeholder="Mobile Number"
                    value={addressForm.phoneno}
                    fullWidth
                    className={classes.textField}
                    size="small"
                    helperText={errorFields.phoneno}
                    error={errorFields.phoneno}
                    onChange={value => change('phoneno', value)}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Address 1"
                    placeholder="Location/Address"
                    value={addressForm.address1}
                    className={classes.textField}
                    helperText={errorFields.address1}
                    size="small"
                    error={errorFields.address1}
                    onChange={value => change('address1', value)}
                    multiline
                />
                <TextField
                    variant="outlined"
                    label="Address 2"
                    placeholder="House No/Locality"
                    value={addressForm.address2}
                    className={classes.textField}
                    helperText={errorFields.address2}
                    fullWidth
                    size="small"
                    error={errorFields.address2}
                    onChange={value => change('address2', value)}
                    multiline
                />
                <TextField
                    variant="outlined"
                    label="Landmark"
                    className={classes.textField}
                    placeholder="LandMark"
                    value={addressForm.landmark}
                    helperText={errorFields.landmark}
                    fullWidth
                    size="small"
                    error={errorFields.landmark}
                    onChange={value => change('landmark', value)}
                />
                <TextField
                    variant="outlined"
                    label="City"
                    placeholder="City"
                    className={classes.textField}
                    value={addressForm.city}
                    helperText={errorFields.city}
                    error={errorFields.city}
                    onChange={value => change('city', value)}
                    fullWidth
                    size="small"
                />
                <TextField
                    variant="outlined"
                    label="State"
                    placeholder="State"
                    className={classes.textField}
                    value={addressForm.state}
                    helperText={errorFields.state}
                    error={errorFields.state}
                    onChange={value => change('state', value)}
                    fullWidth
                    size="small"
                />
                <TextField
                    variant="outlined"
                    label="Pincode"
                    className={classes.textField}
                    placeholder="Pincode"
                    helperText={errorFields.pincode}
                    error={errorFields.pincode}
                    value={addressForm.pincode}
                    onChange={value => change('pincode', value)}
                    fullWidth
                    size="small"
                />
                <CountrySelect selectCountry={(val) => change('country', val)} className={classes.textField}/>
                <Typography variant="subtittle2">{errorFields.country}</Typography>
                <Button 
                fullWidth 
                className={classes.textField} 
                variant="contained" color="primary" 
                onClick={data ? updateAddress: saveAddress}>{loading ? <CircularProgress size={20} color="secondary"/> : data? 'Update Address': 'Save Address'}</Button>
            </Container>)
}
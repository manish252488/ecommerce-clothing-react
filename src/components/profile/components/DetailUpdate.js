import { Button, makeStyles, TextField, Typography, Container, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import moment from 'moment';
import Datepicker from 'react-datepicker'
import { SaveOutlined } from '@material-ui/icons';
import Auth from '../../../api/auth';
import { useDispatch } from 'react-redux';
import { checkJWT, showMessageBar } from '../../../store/actions';
import { isFunction } from '../../../config/Utils';
const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(5),
    },
    textField: {
        marginTop: 20
    }
}))
export default function DetailUpdate({ userData, success }) {
    const [loading, setLoading] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    const initial = userData;
    const [user, setUser] = useState({
        name: userData.name,
        birthdate: userData.birthdate
    })
    const onChange = (key, value) => {
        setUser({ ...user, [key]: value })
    }
    const callSave = () => {
        setLoading(true)
        Auth.updateProfile(user).then(res => {
            dispatch(checkJWT())
            setLoading(false)
            if(isFunction(success)) success(false)
        }).catch(err => {
            dispatch(showMessageBar('error',err.message))
        })
    }
    const validatesave = () => {
        if(initial.name === user.name && moment(initial.birthdate).format("DD/MM/YYYY").toString() === 
        moment(user.birthdate).format("DD/MM/YYYY").toString()){
            return false
        } else {
            return true
        }
    }
    return <Container className={classes.container}>
        <TextField
            label="Name"
            variant="outlined"
            size="small"
            className={classes.textField}
            value={user?.name}
            onChange={(ev) => onChange("name", ev.target.value)}
            fullWidth
        />

        <Typography variant="subtitle1" style={{ fontSize: 12, marginTop: 15, marginLeft: 10, color: "rgba(0, 0, 0, 0.54)" }}>Birthdate</Typography>
        <Datepicker
            name="date"
            value={moment(user?.birthdate).format("DD/MM/yyyy")}
            maxDate={new Date()}
            className="date-picker"
            dateFormat="dd/MM/yyyy"
            autoComplete={false}
            onSelect={(date) => onChange("birthdate", date)} //when day is clicked
            onChange={(date) => onChange("birthdate", date)} //only when value has changed
        />
        <Button
            className={classes.textField}
            disabled={!validatesave()}
            onClick={callSave}
            fullWidth size="small" color="primary" 
            variant="contained" 
            startIcon={loading ? <CircularProgress size={18} color="secondary"/> : <SaveOutlined color="inherit" />}>
                Save</Button>
    </Container>
}
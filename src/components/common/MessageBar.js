import { Snackbar, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideMessageBar } from '../../store/actions';
import Slide from '@material-ui/core/Slide';
export default function MessageBarComponent(props) {
    const dispatch = useDispatch();
    const messagebar = useSelector(({ MessageBar }) => MessageBar)
    const type = messagebar.type;
    const message = messagebar.message;
    const show = messagebar.show;

    const handleClose = () => {
        dispatch(hideMessageBar())
    }
    return <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
     open={show} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide}>
        <Alert onClose={handleClose} severity={type}>
            <AlertTitle style={{textTransform: 'uppercase'}}>{type}</AlertTitle>
        <Typography style={{textTransform: 'uppercase'}}>{message}!</Typography>
        </Alert>
    </Snackbar>
}
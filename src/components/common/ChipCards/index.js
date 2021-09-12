import { Chip, makeStyles } from '@material-ui/core';
import { Error, Warning, Done } from '@material-ui/icons';
import React from 'react';


const useStyles = makeStyles(theme => ({
    success: {
        background: "#4fff5f",
        minWidth: 120,
        color: "#333",
        fontWeight: "bold",
        textTransform: 'uppercase'
    },
    error: {
        background: "#B00020",
        minWidth: 120,
        color: "#333",
        fontWeight: "bold",
        textTransform: 'uppercase'
    },
    warning: {
        background: "#ffcc00",
        minWidth: 120,
        color: "#333",
        fontWeight: "bold",
        textTransform: 'uppercase'
    },
    default: {
        background: "#ffcc00",
        minWidth: 120,
        color: theme.palette.primary.main,
        fontWeight: "bold",
        textTransform: 'uppercase'
    }
}))
export default function ChipCards({ type = 'success' || 'error' || 'warning', text }) {
    const classes = useStyles()
    const getChip = () => {
        switch(type){
            case 'success':
                return <Chip
                label={text}
                size="small"
                className={classes.success}
                deleteIcon={<Done size={10} color="secondary"/>}
            />
            case 'error':
                return <Chip
                label={text}
                size="small"
                className={classes.error}
                deleteIcon={<Warning size={10} color="secondary" />}
            />
            case 'warning':
                return <Chip
                label={text}
                size="small"
                className={classes.warning}
                deleteIcon={<Error size={10} color="secondary" />}
            />
            default:
                return <Chip
                label={text}
                size="small"
                className={classes.default}
                deleteIcon={<Done size={10} color="primary"/>}/>
        }
    }
    return getChip()
}
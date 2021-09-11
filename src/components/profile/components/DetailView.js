import { Typography, Container, makeStyles, Link, IconButton } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import clsx from 'clsx'
import { CreateSharp } from '@material-ui/icons';
const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column',
        marginTop: 15
    },
    title: {
        textTransform: 'capitalize',
        color: theme.palette.text
    },
    subtitle: {
        display: 'block'
    },
    subtitle2: {
        fontWeight: "bold"
    },
    container2: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'row'
    }
}))
export default function DetailView({ user, editOnClick = (val) => { } }) {
    const classes = useStyles()
    return <Container fullWidth="xl" className={classes.container}>
        <div className={classes.container2}><Typography variant="h5" className={classes.title}>{user?.name}</Typography>
            <IconButton onClick={() => editOnClick(true)} size="small"><CreateSharp color="primary"></CreateSharp></IconButton></div>
        <Typography variant="subtitle2" className={classes.subtitle}>{user?.email}</Typography>
        <Link href={`tel:+91${user?.phoneNo}`} className={clsx(classes.subtitle, classes.subtitle2)}>
            +91&nbsp;{user?.phoneNo}</Link>
        <Typography variant="subtitle2" className={classes.subtitle}>{moment(user?.birthdate).format("DD/MMM/YYYY")}</Typography>
    </Container>
}
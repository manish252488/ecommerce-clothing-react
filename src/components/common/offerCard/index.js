import { Box, Card, CardContent, Container, Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import History from '../../../@history';
import { commingsoon } from '../../../assets';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        borderRadius: 10,
        cursor: 'pointer',
    },
    banner: {
        width: '100%',
        height: 0,
        paddingTop: '25%',
        paddingBottom: '75%',
        backgroundPosition: 'center !important',
        backgroundSize: 'cover !important',
        backgroundRepeat: 'no-repeat !important'
    },
    title: {
        textTransform: 'capitalize',
        textAlign: 'center',
        color: theme.palette.primary.main,
        fontWeight: 900,
        background: "rgb(255 255 255 / 31%)",
        letterSpacing: 2
    },
    subtitle: {
        textTransform: 'capitalize',
        textAlign: 'center',
        color: theme.palette.secondary.light,
        textShadow: '1px 1px 1px #333',
        fontWeight: 400,
        fontSize: 20
    },
}))
export default function OfferCard({ data }) {
    const classes = useStyles()
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.down("1000"))
    return <Grid item xs={media?12 :3} style={{ margin: 10 }}>
        <Card className={classes.root} variant="outlined" onClick={() =>data.isActive === 1 ? History.push(data.links) : null}>
            <CardContent>
                <div style={{ background: `url(${data.picture})` }} className={classes.banner}>
                    {data.isActive === 2 && <div className="arriving-soon"><img src={commingsoon} alt=""/> </div>}
                    <Typography variant="h5" className={classes.title}>{data.offerTitle}</Typography>

                    <Typography className={classes.subtitle}>{data.offerDesc}</Typography>

                </div>
            </CardContent>
        </Card>
    </Grid>
}
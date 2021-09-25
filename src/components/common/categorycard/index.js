import { Box, Card, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { commingsoon } from '../../../assets';

const useStyles = makeStyles(theme => ({
    root: {
        width: 120,
        border: 'none',
        cursor: 'pointer'
    },
    banner: {
        width: '100%',
        height: 120,
        paddingTop: '100%',
        backgroundPosition: 'center !important',
        backgroundSize: 'cover !important',
        borderRadius: '50%'
    },
    title :{ 
        textTransform: 'capitalize',
        textAlign: 'center'
    },
    subtitle: {
        textTransform: 'capitalize',
        textAlign: 'center',
        color: '#6f6f6f'
    }
}))
export default function CategoryCard({ data }) {
    const classes = useStyles()
    return <Box margin={3}>
        <Grid item={3}>
            <Card className={classes.root} variant="outlined">
                <div style={{ background: `url(${data.picture})` }} className={classes.banner}>
                </div>
                <Typography variant="h5" className={classes.title}>{data.offerTitle}</Typography>
            {data.isActive === 1 &&  <Typography className={classes.subtitle}>{data.offerDesc}</Typography>}
            {data.isActive === 2 && <div className="arriving-soon">
                <img src={commingsoon} alt="commingsoon"/>
                </div>}   
            </Card>
        </Grid>
    </Box>
}
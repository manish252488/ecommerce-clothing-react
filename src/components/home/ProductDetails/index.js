import { Button, Card, CardHeader, Chip, Container, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import CustomCarousel from '../../common/corousels/CustomCarousel';
import AppBaseScreen from '../../common/layout/user/AppBaseScreen';
import Products from '../Products';
import RatingComponent from '../Products/components/Rating';
import './index.less'
const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 80,
    },
    card: {
        width: '100%',
    },
    frame: {
        background: '#333',
        margin: theme.spacing(1),
        maxWidth: '100%',
        overflow: 'hidden',
    },
    container: {
        padding: 10,
        overflowY: 'auto'
    },
    description: {
        padding: 20
    },
    boxContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    colorbox: {
        width: 50,
        height: 50,
        border: '3px solid #ddd',
        padding: 1,
        cursor: 'pointer',
        margin: 5
    },
    similiarProducts: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        width: '100%',
        columnGap: 25,
        paddingTop: 5,
        paddingBottom: 5
    }
}))
export default function ProductDetails(props){
    const classes = useStyles()
    return <AppBaseScreen>
        <Container maxWidth="lg" className={classes.root}>
            <Card className={classes.card}>
                <Grid container xs={12}>
                    <Grid item xs={6}>
                        <div className={classes.frame}>
                             <CustomCarousel images={["https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"]} autoPlay={false}/>
                        </div>
                        <div className="btn-container">
                        <Button variant="contained" color="primary">Add to Cart</Button>
                        <Button variant="contained" color="primary">Buy Now</Button>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Container maxWidth="lg" className={classes.container}>
                        <Typography variant="body2"><Chip
                            className={classes.chip}
                            color="primary"
                            label="In Stock"
                        /> #productid </Typography>
                        <Typography variant="h3">
                            product title 
                        </Typography>
                        <Typography variant="h5">2000 <del style={{color: '#333'}}>2500</del></Typography>
                        <Divider />
                        <div className={classes.description}>
                            <Typography variant="h6">Ratings:</Typography>
                        <RatingComponent value={4} />
                        <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                        </div>
                        <Typography variant={'h6'}>
                            Available Colours
                        </Typography>
                        <Divider />
                        <div className={classes.description}>
                            <div className={classes.boxContainer}>
                        {Array(5).fill(5).map(val => <div className={classes.colorbox}></div>)}
                        </div>
                        </div>
                        <Typography variant={'h6'}>
                            Material
                        </Typography>
                        <Divider />
                        <div className={classes.description}>
                        <Chip
                            className={classes.chip}
                            color="primary"
                            label="Cotton"
                        />
                        </div>
                        <Typography variant={'h6'}>
                            Available In
                        </Typography>
                        <Divider />
                        <div className={classes.description}>
                        <Button variant="outlined" color="primary">Filpkart</Button> &nbsp;
                        <Button variant="outlined" color="primary">Amazon</Button> &nbsp;
                        <Button variant="outlined" color="primary">Meesho</Button> &nbsp;
                        </div>
                        </Container>
                    </Grid>
                </Grid>
            </Card>
            <div className={classes.description}>
                
            </div>
            <Card component={Paper} >
                <CardHeader title="Similiar Products"></CardHeader>
                <Divider/>
                <div className={classes.similiarProducts}>
                {
                    Array(8).fill(1).map((val, index) => (
                        <Products key={index}/>
                      ))
                }
                </div>
            </Card>
        </Container>
    </AppBaseScreen>
}
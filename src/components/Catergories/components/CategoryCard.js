import { Card, CardContent, CardMedia, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import History from '../../../@history';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '20%',
    height: '50vh',
    cursor: 'pointer',
    [theme.breakpoints.down("1000")]:{
      width: '25%',
      height: '45vh'
    },
    [theme.breakpoints.down("700")]:{
      width: '32%',
      height: '45vh'
    },
    [theme.breakpoints.down("500")]:{
      width: '49%',
      height: '42vh'
    },

  },
  media: {
    height: 0,
    backgroundPosition: 'inherit',
    transition: '0.5s',
    paddingTop: '95%',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  muted: {
    fontSize: 14,
    color: '#333'
  },
  chip: {
    color: '#fff',
    fontSize: 12,
    width: 80,
    height: 22,
    [theme.breakpoints.up("1000")]:{
      marginLeft: 15
    },
  },
  container: {
    minHeight: 60
  }
}));
export default function CategoryCard({data}){
  const classes = useStyles()
    return <Card className={classes.root} component={Paper}>
    <CardContent onClick={() => History.push(`/home/search?categories=${data.name}`)}>
    <CardMedia
      className={classes.media}
      image={data.picture}
      title={data.name}
      />
      <Typography variant="h6" color="primary">
        {data?.name}
      </Typography>
    </CardContent>
  </Card>
}
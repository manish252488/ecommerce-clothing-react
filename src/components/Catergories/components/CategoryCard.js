import { Card, CardContent, CardMedia, Paper, Typography } from '@material-ui/core';
import React from 'react';

export default function CategoryCard({data}){
    return <Card component={Paper}>
        <CardMedia />
        <CardContent>
            <Typography>name</Typography>
            <Typography>offers</Typography>
            <Typography>description</Typography>
        </CardContent>
    </Card>
}
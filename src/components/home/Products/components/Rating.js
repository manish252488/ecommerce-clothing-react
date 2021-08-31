import { Box, Typography, withStyles } from '@material-ui/core'
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
const StyledRating = withStyles({
    iconFilled: {
      color: 'red',
    },
    iconHover: {
      color: 'green',
    },
  })(Rating);

export default function RatingComponent({value}){

    return <StyledRating
      defaultValue={2}
      precision={0.5}
      getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
      icon={<FavoriteIcon fontSize="inherit" />}
    />
}
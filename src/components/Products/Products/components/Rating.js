import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Box } from '@material-ui/core';
import './index.less'
const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);



export default function RatingComponent({value}) {
  return ( <Box component="fieldset" mb={3} borderColor="transparent">
  <StyledRating
    name="customized-color"
    defaultValue={2}
    value={2}
    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
    precision={0.5}
    icon={<FavoriteIcon fontSize="inherit" />}
  />
</Box>
  );
}

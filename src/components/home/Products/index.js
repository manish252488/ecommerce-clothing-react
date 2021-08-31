import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { sample } from '../../../assets';
import RatingComponent from './components/Rating';
import { DoneOutlined, DoneSharp, ShoppingBasket, ShoppingCartRounded } from '@material-ui/icons';
import { Button, Chip, Tooltip } from '@material-ui/core';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import CustomTooltip from '../../common/CustomTooltip';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    minWidth: 250
  },
  media: {
    height: 0,
    backgroundPosition: 'inherit',
    paddingTop: '90%',
    transition: '0.5s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
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
    marginLeft: 10,
    width: 88,
    height: 22,
  }
}));

export default function Products() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={sample}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="h6" color="primary" component="p">
          Roadster-black hood
        </Typography>
        <RatingComponent value={2}/>
        <Typography variant="h6" className={classes.bold}>₹ 2400 &nbsp;
        <del className={classes.muted}>₹ 2800</del>
        <Chip
        className={classes.chip}
        color="primary"
        label="In Stock"
      />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to cart">
          <CustomTooltip title="Add to Cart!">
              <ShoppingCartRounded />
          </CustomTooltip>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button startIcon={<FlashOnIcon color="secondary"/>} variant="contained" color="primary">Buy Now</Button>
      </CardActions>
      </Card>
  );
}
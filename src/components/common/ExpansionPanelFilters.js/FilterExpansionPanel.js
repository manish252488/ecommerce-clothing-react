import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import AppSlider from '../PrettoSlider';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },

  details: {
    alignItems: 'center',
  },
  container : {
    flexBasis: '33.33%',
    maxWidth: '33.33%',
    [theme.breakpoints.down("xs")] :{
      flexBasis: '100%',
      maxWidth: "100%"
    }
  }
});

function FilterExpansionPanel(props) {
  const { classes } = props;
 const [filters, setFilters] = useState({
    priceRange: {
      min: 0,
      max: 10000
    },
    categories: [],
    brands: [],
    colors: [],
    size: [],
  })
  const [sorts, setSorts] = useState({
    alpha: 1,
    price: 1
  })
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
        <Grid container wrap={true}>
         
            <Grid item className={classes.container}>
              <Typography variant="h6">Price Range</Typography>
              <Divider />
              <AppSlider 
                value={10} 
                step={100}
                onChange={(val) => console.log(val)}
                />
            </Grid>
            <Grid item className={classes.container}></Grid>
            <Grid item className={classes.container}></Grid>
        </Grid>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

FilterExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterExpansionPanel);
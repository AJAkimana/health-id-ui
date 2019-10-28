import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  withStyles,
  Typography,
  Grid,
  Card,
  CardMedia
} from '@material-ui/core';
import withAuth from '../withAuth';
import { comingSoonStyles } from '../../assets/styles/comingsoon';
import ProductNavBar from './productNavBar';
import ComingSoonImage from '../../assets/images/comingsoon.gif';

import { useStateValue } from '../../providers/stateProvider';

const ProductMenuComingSoon = (props) => {
  const { classes } = props;
  const [, dispatch] = Object.values(useStateValue());

  React.useEffect(() => {
    dispatch({
      type: 'changeGrid',
      grid: 'grid3'
    });
  }, []);

  return (
    <Fragment>
      <ProductNavBar activeGrid="grid2" />
      <Paper className={classes.paper}>
        <Grid container spacing={24} className={classes.containerGrid}>
          <Grid container item xs={12}>
            <Grid container item xs={8} spacing={24}>
              <Grid item xs={12}>
                <Typography variant="h5" className={classes.arrowButtonLabel}>
                  Menu info coming soon
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Card elevation={0} className={classes.card}>
                <CardMedia className={classes.media} image={ComingSoonImage} title="Coming soon" />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};
ProductMenuComingSoon.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string)
};

ProductMenuComingSoon.defaultProps = {
  classes: {}
};

export default withAuth(withStyles(comingSoonStyles)(ProductMenuComingSoon));

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
import ComingSoonImage from '../../assets/images/comingsoon.gif';

const ComingSoon = (props) => {
  const { classes } = props;
  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid container spacing={24} className={classes.containerGrid}>
          <Grid container item xs={12}>
            <Grid container item xs={8} spacing={24}>
              <Grid item xs={12}>
                <Typography variant="h5" className={classes.arrowButtonLabel}>
                  Coming soon
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
ComingSoon.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string)
};

ComingSoon.defaultProps = {
  classes: {}
};

export default withAuth(withStyles(comingSoonStyles)(ComingSoon));

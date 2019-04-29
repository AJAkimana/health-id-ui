import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loaderStyles } from '../../assets/css/setup';

const styles = loaderStyles;

const Loader = ({ classes }) => (
  <div>
    <CircularProgress className={classes.progress} />
  </div>
);

Loader.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(Loader);

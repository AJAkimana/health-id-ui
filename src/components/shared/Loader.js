import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loaderStyles } from '../../assets/styles/setup';

const styles = loaderStyles;

const Loader = ({ classes, size }) => (
  <div>
    <CircularProgress size={size} className={classes.progress} />
  </div>
);

Loader.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  size: PropTypes.number
};

Loader.defaultProps = {
  size: null
};

export default withStyles(styles)(Loader);

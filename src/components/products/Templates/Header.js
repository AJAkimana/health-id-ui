import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import {
  Typography, Grid, Tooltip, IconButton
} from '@material-ui/core';

const ProductHeader = (props) => {
  const {
    classes, previousPage, productName, children
  } = props;
  return (
    <Fragment>
      <Grid container direction="row" alignItems="center" className={classes.arrowButtonGrid}>
        <Grid item>
          <Link to={previousPage}>
            <Tooltip title="Back to products">
              <IconButton>
                <BackIcon className={classes.arrowIcon} />
              </IconButton>
            </Tooltip>
          </Link>
        </Grid>
        <Grid item>
          <Typography variant="h5" className={classes.arrowButtonLabel}>
            {productName}
          </Typography>
        </Grid>
        <Grid className={classes.buttonGrid}>{children}</Grid>
      </Grid>
    </Fragment>
  );
};
ProductHeader.propTypes = {
  productName: PropTypes.string.isRequired,
  previousPage: PropTypes.string.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};

export default ProductHeader;

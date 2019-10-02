import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid
} from '@material-ui/core';

const SupplierCommentary = (props) => {
  const { classes, renderTextField, supplier } = props;

  return (
    <Fragment>
      <div className={classes.dividerDiv}>
        <Typography
          paragraph
          variant="h6"
          align="left"
          gutterBottom
          className={classes.dividerHeaders}
        >
          Commentary
        </Typography>
      </div>
      <Grid container spacing={24} className={classes.containerGrid}>
        <Grid item xs={12}>
          {renderTextField(
            classes.descriptionFields, 'commentary', '', supplier.commentary
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

SupplierCommentary.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  renderTextField: PropTypes.func.isRequired,
  supplier: PropTypes.shape({
    commentary: PropTypes.string
  }).isRequired
};

export default SupplierCommentary;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';


const StockDetails = (props) => {
  const {
    classes,
    renderTextField,
    salesPrice,
    reorderMax,
    reorderPoint,
    nearestExpiryDate,
    productQuantity
  } = props;
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
          Stock Details
        </Typography>
      </div>

      <Grid container spacing={24} className={classes.containerGrid}>
        <Grid item xs={4} className={classes.childGrids}>
          {renderTextField(classes.newTextFields, 'quantity', 'Quantity', productQuantity || 0)}
        </Grid>
        <Grid item xs={4} className={classes.childGrids}>
          {renderTextField(classes.newTextFields, 'reorderPoint', 'Re-order Point', reorderPoint)}
        </Grid>
        <Grid item xs={4} className={classes.childGrids}>
          {renderTextField(classes.newTextFields, 'reorderMax', 'Re-order Max', reorderMax)}
        </Grid>
        <Grid item xs={4} className={classes.childGrids}>
          {renderTextField(classes.newTextFields, 'salesPrice', 'Sales Price', salesPrice || 0)}
        </Grid>
        <Grid item xs={4} className={classes.childGrids}>
          {renderTextField(
            classes.newTextFields,
            'nearestExpiryDate',
            'Nearest Expiry Date',
            nearestExpiryDate || 'None'
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

StockDetails.propTypes = {
  productQuantity: PropTypes.number.isRequired,
  salesPrice: PropTypes.number.isRequired,
  reorderMax: PropTypes.number.isRequired,
  reorderPoint: PropTypes.number.isRequired,
  nearestExpiryDate: PropTypes.string.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  renderTextField: PropTypes.func.isRequired,
};

export default StockDetails;

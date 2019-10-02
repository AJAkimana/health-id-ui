import React, { Fragment } from 'react';
import { Grid, Card, CardMedia } from '@material-ui/core';
import PropTypes from 'prop-types';
import Rating from './Rating';

const SupplierDescription = (props) => {
  const { classes, renderTextField, supplier } = props;

  return (
    <Fragment>
      <Grid
        container
        spacing={24}
        className={classes.containerGrid2}
      >
        <Grid container item xs={12}>
          <Grid container item xs={8} spacing={24}>
            <Grid item xs={12}>
              <div className={classes.category}>
                {renderTextField(
                  classes.descriptionFields,
                  'supplier',
                  'Supplier ID',
                  supplier.id
                )}
              </div>
              <div className={classes.category}>
                {renderTextField('', 'address', 'Address Line 1', supplier.addressLine1)}
              </div>
              <div>
                {renderTextField('', 'address', 'Address Line 2', supplier.addressLine2)}
              </div>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Card elevation={0} className={classes.card}>
              <CardMedia
                className={classes.media}
                image={supplier.logo}
                title="Supplier Image"
              />
            </Card>
          </Grid>
        </Grid>
        <Grid container item xs={4}>
          <div>
            {renderTextField(
              classes.descriptionFields,
              'email',
              'Email',
              supplier.email
            )}
          </div>
        </Grid>
        <Grid container item xs={4}>
          <div>
            {renderTextField(
              classes.descriptionFields,
              'mobile',
              'Mobile',
              supplier.mobileNumber
            )}
          </div>
        </Grid>
        <Grid container item xs={4}>
          <div>
            {
              supplier.isApproved ? (
                <Rating rating={supplier.rating} starClass="supplierStar" />
              )
                : ''
            }
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

SupplierDescription.propTypes = {
  classes: PropTypes.shape({
    containerGrid: PropTypes.string,
    containerGrid2: PropTypes.string,
    category: PropTypes.string,
    card: PropTypes.string,
    media: PropTypes.string,
    descriptionFields: PropTypes.string
  }).isRequired,
  renderTextField: PropTypes.func.isRequired,
  supplier: PropTypes.instanceOf(Object).isRequired
};

export default SupplierDescription;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import {
  Paper, Typography, TextField, Grid, Card,
  CardActionArea, CardMedia, Chip, Tooltip, IconButton, withStyles
} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import { approveProductsStyles } from '../../assets/css/products';
import APPROVE_PRODUCT_MUTATION from './approveProductMutation';
import withAuth from '../withAuth';
import Dashboard from '../shared/Dashboard/Dashboard';
import Footer from '../shared/Footer';
import notify from '../shared/Toaster';


export class ApproveProduct extends Component {
  state = {
    approved: false
  }

  handleProductApproval = () => {
    const { approveProduct, refetch, product } = this.props;
    const { id, productName } = product;
    approveProduct({
      variables: {
        id
      }
    }).then(() => {
      notify(`${productName} is now an approved product`);
      this.setState({ approved: true });
      refetch();
    }).catch((error) => {
      notify(error.message.slice(14));
    });
  }

  render() {
    const { approved } = this.state;
    const {
      product,
      classes,
      session,
    } = this.props;

    const {
      id,
      productName,
      skuNumber,
      description,
      manufacturer,
      productCategory,
      measurementUnit,
      image,
      brand,
      vatStatus,
      preferedSupplier,
      loyaltyWeight,
      backupSupplier,
      tags,
      isApproved
    } = product;

    const renderTextField = (style, name, label, value) => (
      <TextField
        className={style}
        id={name}
        name={name}
        label={label}
        defaultValue={value}
        fullWidth
        InputProps={{ disableUnderline: true, readOnly: true }}
      />
    );

    return (
      <React.Fragment>
        <Dashboard isActive="grid3" session={session} />
        <Grid
          container
          direction="row"
          alignItems="center"
          className={classes.arrowButtonGrid}
        >
          <Grid item>
            <Link to="/products">
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
          <Grid className={classes.buttonGrid}>
            <Button variant="contained" color="primary" className={classes.editButton}>
            Edit
            </Button>
            <Button disabled={isApproved || approved} variant="contained" className={classes.approveButton} onClick={this.handleProductApproval}>
              {isApproved || approved ? 'Approved' : 'Approve'}
            </Button>
          </Grid>
        </Grid>

        <Paper className={classes.paper}>
          <Grid container spacing={24} className={classes.containerGrid}>
            <Grid container item xs={12}>
              <Grid container item xs={8} spacing={24}>
                <Grid item xs={12}>
                  <div className={classes.category}>
                    {renderTextField(
                      classes.descriptionFields, 'productCategory', 'Category', productCategory.name
                    )}
                  </div>
                  <div>
                    {renderTextField(
                      classes.descriptionFields, 'description', 'Description', description
                    )}
                  </div>

                  <Paper elevation={0} className={classes.tagsRoot}>
                    {tags.map(tag => (
                      <Chip
                        key={tags.indexOf(tag)}
                        label={tag}
                        className={classes.tagChip}
                        id="tag-chip"
                      />
                    ))}
                  </Paper>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Card elevation={0} className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={image}
                      title="Product Image"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <div className={classes.dividerDiv}>
            <Typography paragraph variant="h6" align="left" gutterBottom className={classes.dividerHeaders}>
            Product Information
            </Typography>
          </div>

          <Grid container spacing={24} className={classes.containerGrid}>
            <Grid item xs={4}>
              {renderTextField(
                classes.descriptionFields, 'productId', 'Product ID', id
              )}
            </Grid>
            <Grid item xs={4}>
              {renderTextField(
                classes.descriptionFields, 'skuNumber', 'SKU', skuNumber
              )}
            </Grid>
            <Grid item xs={4}>
              {renderTextField(classes.newTextFields, 'vatStatus', 'VAT Status', vatStatus)}
            </Grid>
            <Grid item xs={4}>
              {renderTextField(
                classes.descriptionFields, 'manufacturer', 'Manufacturer', manufacturer
              )}
            </Grid>
            <Grid item xs={4}>
              {renderTextField(classes.newTextFields, 'brand', 'Brand', brand)}

            </Grid>
            <Grid item xs={4}>
              {renderTextField(
                classes.descriptionFields, 'measurementUnit', 'Measurement Unit',
                measurementUnit.name
              )}
            </Grid>
            <Grid item xs={4}>
              {renderTextField(
                classes.newTextFields, 'loyaltyWeight', 'Loyalty Weight',
                loyaltyWeight
              )}
            </Grid>
            <Grid item xs={4}>
              {renderTextField(
                classes.newTextFields, 'preferedSupplier', 'Prefered Supplier',
                preferedSupplier.name
              )}
            </Grid>
            <Grid item xs={4}>
              {renderTextField(
                classes.newTextFields, 'backupSupplier', 'Backup Supplier',
                backupSupplier.name
              )}
            </Grid>
          </Grid>

        </Paper>
        <Footer />
      </React.Fragment>
    );
  }
}

ApproveProduct.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  refetch: PropTypes.func.isRequired,
  approveProduct: PropTypes.func.isRequired,
};

ApproveProduct.defaultProps = {
  session: { me: {} },
};

const APPROVE_PRODUCT = graphql(APPROVE_PRODUCT_MUTATION, { name: 'approveProduct' });

export default compose(
  APPROVE_PRODUCT
)(withAuth(withRouter(withStyles(approveProductsStyles)(ApproveProduct))));

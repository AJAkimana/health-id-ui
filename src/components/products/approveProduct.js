import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import {
  Paper, TextField, withStyles
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { approveProductsStyles } from '../../assets/styles/products/products';
import APPROVE_PRODUCT_MUTATION from './approveProductMutation';
import withAuth from '../withAuth';
import Dashboard from '../shared/Dashboard/Dashboard';
import Footer from '../shared/Footer';
import notify from '../shared/Toaster';
import Description from './Templates/Description';
import ProductInformation from './Templates/ProductInformation';
import ProductHeader from './Templates/Header';
import RenderDescriptionField from './Templates/renderDescriptionField';

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
      preferredSupplier,
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
        value={value}
        fullWidth
        InputProps={{ disableUnderline: true, readOnly: true }}
      />
    );
    return (
      <React.Fragment>
        <Dashboard isActive="grid3" session={session} />
        <ProductHeader classes={classes} previousPage="/products/proposed" productName={productName}>
          <Button variant="contained" color="primary" className={classes.editButton}>
            Edit
          </Button>
          <Button disabled={isApproved || approved} variant="contained" className={classes.approveButton} onClick={this.handleProductApproval}>
            {isApproved || approved ? 'Approved' : 'Approve'}
          </Button>
        </ProductHeader>

        <Paper className={classes.paper}>
          <Description
            classes={classes}
            renderTextField={renderTextField}
            renderDescriptionField={RenderDescriptionField}
            productCategory={productCategory}
            description={description}
            tags={tags}
            image={image}
          />

          <ProductInformation
            classes={classes}
            renderTextField={renderTextField}
            measurementUnit={measurementUnit}
            loyaltyWeight={loyaltyWeight}
            preferredSupplier={preferredSupplier}
            backupSupplier={backupSupplier}
            id={id}
            skuNumber={skuNumber}
            vatStatus={vatStatus}
            manufacturer={manufacturer}
            brand={brand}
          />
        </Paper>
        <Footer />
      </React.Fragment>
    );
  }
}

ApproveProduct.propTypes = {
  product: PropTypes.objectOf(PropTypes.object).isRequired,
  session: PropTypes.objectOf(PropTypes.object),
  refetch: PropTypes.func.isRequired,
  approveProduct: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
};

ApproveProduct.defaultProps = {
  session: { me: {} },
  classes: {},
};

const APPROVE_PRODUCT = graphql(APPROVE_PRODUCT_MUTATION, { name: 'approveProduct' });

export default compose(
  APPROVE_PRODUCT
)(withAuth(withRouter(withStyles(approveProductsStyles)(ApproveProduct))));

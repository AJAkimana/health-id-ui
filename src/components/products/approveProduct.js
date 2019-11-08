import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import {
  Paper, withStyles
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { approveProductsStyles } from '../../assets/styles/products/products';
import APPROVE_PRODUCT_MUTATION from './approveProductMutation';
import withAuth from '../withAuth';
import Footer from '../shared/Footer';
import notify from '../shared/Toaster';
import Description from './Templates/Description';
import ProductInformation from './Templates/ProductInformation';
import ProductHeader from './Templates/Header';
import RenderDescriptionField from './Templates/renderDescriptionField';
import RenderTextField from './Templates/RenderTextField';
import { StateContext } from '../../providers/stateProvider';


export class ApproveProduct extends Component {
  state = {
    approved: false
  }

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid3'
    });
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

  static contextType = StateContext;

  render() {
    const { approved } = this.state;
    const {
      product,
      classes,
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

    return (
      <React.Fragment>
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
            productName={productName}
            renderTextField={RenderTextField}
            renderDescriptionField={RenderDescriptionField}
            productCategory={productCategory}
            description={description}
            tags={tags}
            image={image}
          />

          <ProductInformation
            classes={classes}
            renderTextField={RenderTextField}
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
  refetch: PropTypes.func.isRequired,
  approveProduct: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
};

ApproveProduct.defaultProps = {
  classes: {},
};

const APPROVE_PRODUCT = graphql(APPROVE_PRODUCT_MUTATION, { name: 'approveProduct' });

export default compose(
  APPROVE_PRODUCT
)(withAuth(withRouter(withStyles(approveProductsStyles)(ApproveProduct))));

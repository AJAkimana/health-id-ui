import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography } from '@material-ui/core';
import { ProductFormStyles } from '../../../../assets/styles/products/addProductStyles';

const ProductDescriptions = (props) => {
  const {
    productName, handleChange, productDescription, handleProductName
  } = props;

  return (
    <Fragment>
      <div>
        <TextField
          className="name"
          type="text"
          onChange={handleProductName}
          label="Name"
          fullWidth
          required
          name="productName"
          value={productName}
        />
      </div>
      <div
        style={ProductFormStyles.descriptionField}
      >
        <Typography
          style={ProductFormStyles.textAreaLabel}
        >
            Description
        </Typography>
        <textarea
          className="description"
          type="text"
          onChange={handleChange}
          name="productDescription"
          value={productDescription}
          rows="6"
          cols="70"
          style={ProductFormStyles.textArea}
        />
      </div>
    </Fragment>
  );
};

ProductDescriptions.propTypes = {
  productName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleProductName: PropTypes.func.isRequired,
  productDescription: PropTypes.string.isRequired
};

export default ProductDescriptions;

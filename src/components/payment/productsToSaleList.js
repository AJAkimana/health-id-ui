import React from 'react';
import PropTypes from 'prop-types';
import { Typography, TableRow, TableCell } from '@material-ui/core';
import currencyFormatter from './utils/formatter';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

const ProductsToSaleList = ({ product, currency }) => {
  const {
    quantity, productName, salesPrice, discount, discountedTotal, dispensingSize,
  } = product;
  return (
    <TableRow key={productName} id="productRow">
      <TableCell align="left" style={salesDialogStyles.productListCell}>
        {productName}
        <Typography variant="caption" style={salesDialogStyles.productdispensingSize}>{dispensingSize.name}</Typography>
      </TableCell>
      <TableCell align="center" style={salesDialogStyles.generalProductListCell}>{quantity}</TableCell>
      <TableCell align="left" style={salesDialogStyles.generalProductListCell}>{`${currency}  ${currencyFormatter(salesPrice)}`}</TableCell>
      <TableCell align="center" style={salesDialogStyles.generalProductListCell}>{`${discount}${'%'}`}</TableCell>
      <TableCell align="left" style={salesDialogStyles.discountedTotalCell}>{`${currency}  ${currencyFormatter(discountedTotal)}`}</TableCell>
    </TableRow>
  );
};

ProductsToSaleList.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  currency: PropTypes.string.isRequired,
};

export default ProductsToSaleList;

import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@material-ui/core';
import currencyFormatter from './utils/formatter';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

const RecieptProductList = ({ product }) => {
  const {
    quantity, productName, discountedTotal, salesPrice,
  } = product;
  return (
    <TableRow key={productName} id="productRow" style={salesDialogStyles.recieptTableRow}>
      <TableCell style={salesDialogStyles.receiptTableCell}>
        {productName}
      </TableCell>

      <TableCell style={salesDialogStyles.receiptTableCell}>{`${quantity} x ${salesPrice}`}</TableCell>
      <TableCell style={salesDialogStyles.receiptDiscountTotal}>{`${currencyFormatter(discountedTotal)}`}</TableCell>
    </TableRow>
  );
};

RecieptProductList.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};

export default RecieptProductList;

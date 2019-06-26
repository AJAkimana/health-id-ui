import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { tableStyles } from '../../assets/css/sellScreenStyles';
import { NotesIcon, TrashIcon } from '../../assets/SvgIcons/sellScreenSvgs';
import FormatCurrency from '../utils/formatCurrency';

const styles = tableStyles;

const ReturnTableRow = ({
  item,
  currency,
  renderQuantity,
  handleCartItemNote,
  handleCartItemDelete
}) => (
  <TableRow
    id="cart-table-row"
    style={tableStyles.batchRow}
  >
    <TableCell align="left" style={tableStyles.typoCell}>
      <Typography variant="subtitle2" style={tableStyles.tableTypo}>
        {item.productName}
      </Typography>
      <Typography variant="caption" style={tableStyles.tableTypoCaption}>
        {item.measurementUnit.name}
      </Typography>
    </TableCell>
    <TableCell align="center" style={tableStyles.tableCell}>
      {renderQuantity(item)}
    </TableCell>
    <TableCell align="center" style={tableStyles.tableCell}>
      {<FormatCurrency
        amount={item.salesPrice}
        currency={currency}
      />}
    </TableCell>
    <TableCell align="center" style={tableStyles.tableCell}>
      {item.discount}
      %
    </TableCell>
    <TableCell align="center" style={tableStyles.tableCell}>
      <NotesIcon
        id={item.id}
        style={tableStyles.icons}
        onClick={handleCartItemNote}
      />
    </TableCell>
    <TableCell align="center" style={tableStyles.tableCell}>
      <TrashIcon
        style={tableStyles.icons}
        onClick={() => handleCartItemDelete(item)}
      />
    </TableCell>
  </TableRow>
);

ReturnTableRow.propTypes = {
  item: PropTypes.instanceOf(Object),
  currency: PropTypes.string,
  renderQuantity: PropTypes.func.isRequired,
  handleCartItemNote: PropTypes.func.isRequired,
  handleCartItemDelete: PropTypes.func.isRequired,
};

ReturnTableRow.defaultProps = {
  item: {},
  currency: '',
};

export default withStyles(styles)(ReturnTableRow);

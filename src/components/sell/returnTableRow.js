import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow, TableCell, Typography, Tooltip,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { tableStyles } from '../../assets/css/sellScreenStyles';
import { NotesIcon, TrashIcon, DiscountIcon } from '../../assets/SvgIcons/sellScreenSvgs';
import FormatCurrency from '../utils/formatCurrency';

const styles = tableStyles;

const ReturnTableRow = ({
  item,
  currency,
  renderQuantity,
  handleCartItemNote,
  handleCartItemDelete,
  calculateTotal,
}) => (
  <TableRow
    id="cart-table-row"
    style={tableStyles.batchRow}
  >
    <TableCell align="left" style={tableStyles.tableCell}>
      <Typography variant="subtitle2" style={tableStyles.tableTypo}>
        {item.productName}
      </Typography>
      <Typography variant="caption" style={tableStyles.tableTypoCaption}>
        {item.dispensingSize.name}
      </Typography>
    </TableCell>
    <TableCell align="left" style={tableStyles.tableCell}>
      {renderQuantity(item)}
    </TableCell>
    <TableCell align="left" style={tableStyles.tableCell}>
      <FormatCurrency
        amount={item.salesPrice}
        currency={currency}
      />
    </TableCell>
    <TableCell align="left" style={tableStyles.tableCell}>
      <FormatCurrency
        amount={calculateTotal(item.quantity, item.salesPrice)}
        currency={currency}
      />
    </TableCell>
    <TableCell align="right" style={tableStyles.tableIconCell}>
      {item.discount ? (
        <Tooltip title={`${item.discount}%`}>
          <DiscountIcon
            id={item.id}
            style={tableStyles.icons}
          />
        </Tooltip>
      ) : ''}
    </TableCell>
    <TableCell align="right" style={tableStyles.tableIconCell}>
      <NotesIcon
        id={item.id}
        style={tableStyles.icons}
        onClick={handleCartItemNote}
      />
    </TableCell>
    <TableCell align="right" style={tableStyles.tableIconCell}>
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
  calculateTotal: PropTypes.func.isRequired,
};

ReturnTableRow.defaultProps = {
  item: {},
  currency: '',
};

export default withStyles(styles)(ReturnTableRow);

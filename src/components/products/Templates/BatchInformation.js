import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import { tableStyles } from '../../../assets/styles/products/productDetailStyles';

const BatchInformation = (props) => {
  const {
    classes, renderTableCell, withPriceField,
    skuNumber, manufacturer, currency, moneyFormat, quantityTotal, priceTotal
  } = props;

  return (
    <Fragment>
      <div className={classes.dividerDiv}>
        <Typography paragraph variant="h6" align="left" gutterBottom className={classes.dividerHeaders}>
    Batch Information
        </Typography>
      </div>
      <Grid container spacing={24} className={classes.containerGrid}>
        <Grid item xs={12} style={tableStyles.batchHeader}>
          <Table>
            <TableHead>
              <TableRow style={tableStyles.batchRow}>
                {renderTableCell('left', tableStyles.tableHeader, 'Date Received')}
                {renderTableCell('left', tableStyles.tableHeader, 'SKU')}
                {renderTableCell('left', tableStyles.tableHeader, 'Supplier')}
                {renderTableCell('left', tableStyles.tableHeader, 'Manufacturer')}
                {renderTableCell('left', tableStyles.tableHeader, 'Expiry Date')}
                {renderTableCell('right', tableStyles.tableHeader, 'Quantity')}
                {renderTableCell('right', tableStyles.tableHeader, 'Unit Cost')}
                {renderTableCell('right', tableStyles.tableHeader, 'Total Cost')}
              </TableRow>
            </TableHead>
            <TableBody>
              {withPriceField.map(batch => (
                <TableRow
                  id="outlets-table-row"
                  key={batch.id}
                  style={tableStyles.batchRow}
                >
                  <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                    {batch.dateReceived}
                  </TableCell>
                  <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                    {skuNumber}
                  </TableCell>
                  <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                    {batch.supplier.name}
                  </TableCell>
                  <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                    {manufacturer}
                  </TableCell>
                  <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                    {batch.expiryDate}
                  </TableCell>
                  <TableCell align="right" component="th" scope="row" style={tableStyles.tableCell}>
                    {batch.quantity ? batch.quantity : 0}
                  </TableCell>
                  <TableCell align="right" component="th" scope="row" style={tableStyles.tableCell}>
                    {currency}
                    {' '}
                    {moneyFormat(batch.unitCost)}
                  </TableCell>
                  <TableCell align="right" component="th" scope="row" style={tableStyles.tableCell}>
                    {currency}
                    {' '}
                    {moneyFormat(batch.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableHead>
              <TableRow style={tableStyles.batchRow}>
                <TableCell align="left" style={tableStyles.tableFooter} />
                <TableCell align="left" style={tableStyles.tableFooter} />
                <TableCell align="left" style={tableStyles.tableFooter} />
                <TableCell
                  align="right"
                  style={tableStyles.tableHeader}
                >
                Total
                </TableCell>
                <TableCell align="right" style={tableStyles.tableFooter} />
                <TableCell align="right" style={tableStyles.tableHeader}>
                  {quantityTotal(withPriceField)}
                </TableCell>
                <TableCell
                  align="right"
                  style={tableStyles.tableHeader}
                >
                Grand Total
                </TableCell>
                <TableCell align="right" style={tableStyles.tableHeader}>
                  {currency}
                  {' '}
                  {moneyFormat(priceTotal(withPriceField))}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Grid>
      </Grid>
    </Fragment>
  );
};

BatchInformation.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  renderTableCell: PropTypes.func.isRequired,
  withPriceField: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.func
  })).isRequired,
  skuNumber: PropTypes.string.isRequired,
  manufacturer: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  moneyFormat: PropTypes.func.isRequired,
  quantityTotal: PropTypes.func.isRequired,
  priceTotal: PropTypes.func.isRequired,
};

export default BatchInformation;

import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, Divider, TableRow, TableCell, TableBody, Table, TableHead
} from '@material-ui/core';
import currencyFormatter from './utils/formatter';
import dateFormatter from './utils/dateFormatter';
import RecieptProductList from './recieptProductList';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

class RecieptTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.formattedDate = dateFormatter(new Date());
  }

  render() {
    const {
      me,
      products,
      computedSubTotal,
      computedTotal,
      computedDiscount,
      cashRecieved,
      balanceDue,
      barcodeUrl,
      receiptNo,
      registerID,
      tradingName,
      country,
      city,
      phoneNumber,
      addressLine1,
    } = this.props;

    return (
      <div id="main-div" style={salesDialogStyles.reciepttemplateMainDiv}>
        <Grid container justify="center" style={salesDialogStyles.reciepttemplateGridContainer}>
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="overline"
              style={salesDialogStyles.businessName}
            >
              {tradingName}

            </Typography>
            <Typography align="center" variant="overline" style={salesDialogStyles.address}>{addressLine1}</Typography>
            <Typography align="center" variant="overline" style={salesDialogStyles.address}>{`${city} , ${country}`}</Typography>
            <Typography align="center" variant="caption" style={salesDialogStyles.contactNo}>{`${'Telephone:'} ${phoneNumber}`}</Typography>

          </Grid>
          <div className="table-content" style={salesDialogStyles.tableDiv}>
            <Divider variant="fullWidth" />
            <Table>
              <TableHead>
                <TableRow style={salesDialogStyles.tableRow1}>
                  <TableCell
                    align="left"
                    style={salesDialogStyles.recieptNoCell}
                  >
                    {`${'RECIEPT'} ${receiptNo}`}

                  </TableCell>

                  <TableCell style={salesDialogStyles.redundantCell} />

                  <TableCell
                    align="left"
                    style={salesDialogStyles.dateCell}
                  >
                    {this.formattedDate}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  products.map(product => (
                    <RecieptProductList
                      product={product}
                      key={product.productName}
                    />
                  ))
                }
              </TableBody>
              <TableBody>
                <TableRow style={salesDialogStyles.generalRowStyle}>
                  <TableCell style={salesDialogStyles.redundantCell} />
                  <TableCell style={salesDialogStyles.redundantCell} />
                  <TableCell style={salesDialogStyles.redundantCell} />
                </TableRow>
                <TableRow style={salesDialogStyles.row2} />
                <TableRow style={salesDialogStyles.row3} />
                <TableRow style={salesDialogStyles.generalRowStyle}>
                  <TableCell style={salesDialogStyles.rowRedundantCell} />
                  <TableCell style={salesDialogStyles.subtotalTitleCell}>SUB TOTAL</TableCell>
                  <TableCell style={salesDialogStyles.subtotalCell}>{computedSubTotal}</TableCell>
                </TableRow>
                <TableRow style={salesDialogStyles.generalRowStyle}>
                  <TableCell style={salesDialogStyles.rowRedundantCell} />
                  <TableCell style={salesDialogStyles.subtotalTitleCell}>DISCOUNT TOTAL</TableCell>
                  <TableCell style={salesDialogStyles.subtotalCell}>{computedDiscount}</TableCell>
                </TableRow>
                <TableRow style={salesDialogStyles.generalRowStyle}>
                  <TableCell style={salesDialogStyles.rowRedundantCell} />
                  <TableCell
                    style={salesDialogStyles.purchaseTotalTitleCell}
                  >
                    PURCHASE TOTAL
                  </TableCell>
                  <TableCell style={salesDialogStyles.purchaseTotalCell}>{computedTotal}</TableCell>
                </TableRow>
                <TableRow style={salesDialogStyles.generalRowStyle}>
                  <TableCell style={salesDialogStyles.rowRedundantCell} />
                  <TableCell
                    style={salesDialogStyles.amountTitleCell}
                  >
                    AMOUNT TO PAY (inclu: VAT)
                  </TableCell>
                  <TableCell style={salesDialogStyles.amountCell}>{computedTotal}</TableCell>
                </TableRow>
                <TableRow style={salesDialogStyles.generalRowStyle}>
                  <TableCell style={salesDialogStyles.rowRedundantCell} />
                  <TableCell style={salesDialogStyles.subtotalTitleCell}>CASH</TableCell>
                  <TableCell
                    style={salesDialogStyles.subtotalCell}
                  >
                    {currencyFormatter(cashRecieved)}
                  </TableCell>
                </TableRow>
                <TableRow style={salesDialogStyles.generalRowStyle}>
                  <TableCell style={salesDialogStyles.rowRedundantCell} />
                  <TableCell style={salesDialogStyles.changeTitleCell}>CHANGE DUE</TableCell>
                  <TableCell
                    style={salesDialogStyles.changeCell}
                  >
                    {currencyFormatter(balanceDue)}
                  </TableCell>
                </TableRow>
                <TableRow style={salesDialogStyles.redundantRow4}>
                  <TableCell style={salesDialogStyles.redundantCell} />
                  <TableCell style={salesDialogStyles.redundantCell} />
                  <TableCell style={salesDialogStyles.redundantCell} />
                </TableRow>
                <TableRow style={salesDialogStyles.redundantRow4} />
                <TableRow style={salesDialogStyles.tableRow1}>
                  <TableCell style={salesDialogStyles.cashierCell}>{`${'Your Cashier Today'} : ${me.firstName || ''} ${me.lastName || ''}`}</TableCell>
                  <TableCell />
                  <TableCell
                    style={salesDialogStyles.registerCell}
                  >
                    {registerID ? `${'Register #'} ${registerID}` : '' }
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <Grid item xs={12} style={salesDialogStyles.barcodeGrid}>
            <div style={salesDialogStyles.barcodeDiv}>
              <img
                src={barcodeUrl}
                alt="barcode missing"
                style={salesDialogStyles.barcodeImage}
              />
            </div>
            <Typography align="center" variant="caption" style={salesDialogStyles.thanksText}>Thank you for shopping with us. Please come again</Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

RecieptTemplate.propTypes = {
  me: PropTypes.instanceOf(Object).isRequired,
  products: PropTypes.arrayOf(Object).isRequired,
  computedSubTotal: PropTypes.string.isRequired,
  computedTotal: PropTypes.string.isRequired,
  computedDiscount: PropTypes.string.isRequired,
  cashRecieved: PropTypes.string.isRequired,
  balanceDue: PropTypes.number.isRequired,
  barcodeUrl: PropTypes.string.isRequired,
  receiptNo: PropTypes.string.isRequired,
  registerID: PropTypes.string,
  tradingName: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  addressLine1: PropTypes.string.isRequired,
};

RecieptTemplate.defaultProps = {
  registerID: ''
};

export default RecieptTemplate;

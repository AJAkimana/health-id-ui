import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, List, ListItem, ListItemText, DialogContent, TextField, InputAdornment
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import salesDialogStyles from '../../assets/css/salesDialogStyles';
import currencyFormatter from './utils/formatter';

const styles = salesDialogStyles;

const PaymentSummary = (props) => {
  const {
    classes,
    currency,
    totalToPay,
    balanceDue,
    cashRecieved,
    cashChecked,
    cardChecked,
    handleCashInput,
  } = props;

  const computedBalance = currencyFormatter(balanceDue);

  return (
    <DialogContent>
      <List key="payment-summary-list">
        <ListItem key="total-amount">
          <ListItemText
            primary={<Typography variant="h6" className={classes.finalSaleTotal}>Total to Pay:</Typography>}
            disableTypography
          />
          <ListItemText
            primary={<Typography className={classes.finalSaleSum}>{`${currency} ${totalToPay}`}</Typography>}
          />
        </ListItem>

        <ListItem key="input-amount" className={classes.paymentMethodText}>
          <ListItemText
            primary={(
              <Typography
                variant="h6"
                className={classes.finalSaleTotal}
              >
                {cashChecked ? 'Paid With Cash' : 'Paid With Card'}
              :
              </Typography>
            )}
            disableTypography
          />

          {
            cardChecked ? (
              <ListItemText primary={<Typography className={classes.totalSum}>{`${currency}  ${totalToPay}`}</Typography>} />
            ) : (
              <ListItemText
                className={classes.cashListItem}
                primary={(
                  <TextField
                    id="cash-paid-text-field"
                    className={classes.cashInput}
                    variant="outlined"
                    value={cashRecieved}
                    onChange={handleCashInput}
                    autoFocus
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                    }}
                  />
                )}
              />
            )
          }
        </ListItem>
      </List>

      {
        cashChecked && (
          <ListItem key="change-due">
            <ListItemText primary={<Typography variant="h6" className={classes.total}>CHANGE DUE:</Typography>} disableTypography />
            <ListItemText primary={<Typography className={classes.totalSum}>{`${currency} ${computedBalance}`}</Typography>} />
          </ListItem>
        )
      }
    </DialogContent>
  );
};

PaymentSummary.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  currency: PropTypes.string.isRequired,
  totalToPay: PropTypes.string.isRequired,
  balanceDue: PropTypes.number.isRequired,
  cashRecieved: PropTypes.string.isRequired,
  cashChecked: PropTypes.bool.isRequired,
  cardChecked: PropTypes.bool.isRequired,
  handleCashInput: PropTypes.func.isRequired,
};

export default withStyles(styles)(PaymentSummary);

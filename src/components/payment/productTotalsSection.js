import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, List, ListItem, ListItemText,
  Divider, FormControlLabel, Radio
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

const styles = salesDialogStyles;


const ProductTotalsSection = (props) => {
  const {
    classes,
    discount,
    currency,
    cardChecked,
    cashChecked,
    computedTotal,
    computedSubTotal,
    computedDiscount,
    me,
    handlePaymentType
  } = props;

  const { paymentMethod } = me.activeOutlet.outletpreference;
  const showCashPayment = (paymentMethod === 'cash' || paymentMethod === 'both');
  const showCardPayment = (paymentMethod === 'card' || paymentMethod === 'both');

  return (
    <Fragment>
      <List className={classes.productTotalListElement} key="sub-total-list">
        <ListItem key="subtotal">

          <ListItemText
            primary={(
              <Typography
                className={classes.sumHeaders}
              >
                SUBTOTAL:
              </Typography>
            )}
          />

          <ListItemText
            primary={(
              <Typography
                className={classes.subTotal}
              >
                {`${currency}  ${computedSubTotal}`}
              </Typography>
            )}
          />

        </ListItem>

        <ListItem key="discount">

          <ListItemText
            className={classes.discountHeaders}
            primary={(
              <Fragment>
                <span key="discount-title">{`${discount}% `}</span>
                <span key="discount-value" className={classes.discountSpan}> DISCOUNT</span>
              </Fragment>
            )}
          />

          <ListItemText
            primary={(
              <Typography
                className={classes.discountTotal}
              >
                {`${currency}  ${'-'} ${computedDiscount}`}
              </Typography>
            )}
          />
        </ListItem>
      </List>

      <List className={classes.totalSumList} key="final-list">
        <ListItem key="total">
          <ListItemText
            primary={<Typography variant="h6" className={classes.total}>TOTAL TO PAY:</Typography>}
            disableTypography
          />
          <ListItemText
            primary={<Typography className={classes.totalSum}>{`${currency}  ${computedTotal}`}</Typography>}
          />
        </ListItem>

        <ListItem key="payment">
          <ListItemText
            primary={(
              <Typography
                variant="h6"
                className={classes.paymentHeaders}
              >
                Payment Method:
              </Typography>
            )}
            disableTypography
          />
          <div className={classes.paymentFormControlDiv}>
            {showCashPayment
              && (
                <FormControlLabel
                  className={classes.paymentFormControl}
                  checked={cashChecked}
                  control={<Radio id="cash" color="primary" onClick={handlePaymentType} />}
                  label={<Typography className={classes.paymentHeaders}>Cash</Typography>}
                />
              )
            }
            {showCardPayment
              && (
                <FormControlLabel
                  checked={cardChecked}
                  control={<Radio id="card" color="primary" onClick={handlePaymentType} />}
                  label={<Typography className={classes.paymentHeaders}>Card (POS)</Typography>}
                />
              )
            }
          </div>
        </ListItem>
      </List>
      <Divider className={classes.divider} />
    </Fragment>
  );
};

ProductTotalsSection.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  currency: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired,
  cardChecked: PropTypes.bool.isRequired,
  cashChecked: PropTypes.bool.isRequired,
  computedTotal: PropTypes.string.isRequired,
  computedSubTotal: PropTypes.string.isRequired,
  computedDiscount: PropTypes.string.isRequired,
  handlePaymentType: PropTypes.func.isRequired,
  me: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(styles)(ProductTotalsSection);

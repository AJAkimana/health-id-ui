import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import salesDialogStyles from '../../assets/css/salesDialogStyles';
import Loader from '../shared/Loader';

const styles = salesDialogStyles;

const PaymentButton = (props) => {
  const {
    sale,
    classes,
    processing,
    cardChecked,
    handleSale,
    cashConfirmed,
    loading,
    handleProcessing
  } = props;

  return (
    <div className={classes.saleButtonDiv}>
      {
        loading ? (
          <Loader size={30} thickness={10} variant="determinate" />
        ) : !sale && (
          <Button
            id={processing ? 'complete-sale' : 'confirm-sale'}
            variant="contained"
            color="secondary"
            onClick={processing ? handleSale : handleProcessing}
            disabled={!processing || cardChecked ? false : !cashConfirmed}
            className={classes.saleButton}
          >
            {processing ? 'COMPLETE SALE' : 'CONFIRM PAYMENT'}
          </Button>
        )
      }
    </div>
  );
};

PaymentButton.propTypes = {
  sale: PropTypes.bool.isRequired,
  cashConfirmed: PropTypes.bool.isRequired,
  cardChecked: PropTypes.bool.isRequired,
  processing: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  handleSale: PropTypes.func.isRequired,
  handleProcessing: PropTypes.func.isRequired,
};

export default withStyles(styles)(PaymentButton);

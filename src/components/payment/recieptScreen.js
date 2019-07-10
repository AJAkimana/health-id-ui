import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, IconButton, Paper
} from '@material-ui/core';
import ReactToPrint from 'react-to-print';
import ConfirmClose from './confirmClosePopOver';
import email from '../../assets/images/salesDialog/Email.png';
import none from '../../assets/images/salesDialog/None.png';
import print from '../../assets/images/salesDialog/Print.png';
import RecieptTemplate from './recieptTemplate';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

const RecieptScreen = (props) => {
  const {
    me,
    products,
    barcodeUrl,
    receiptNo,
    registerID,
    tradingName,
    country,
    city,
    phoneNumber,
    addressLine1,
    computedSubTotal,
    computedTotal,
    computedDiscount,
    cashRecieved,
    balanceDue,
    confirmAnchorEl,
    confirmPlacement,
    isConfirmPopperOpen,
    handleClosePaymentDialog,
    handleDisplayConfirmPopOver,
    handleCloseConfirmPopOver,
  } = props;

  const componentRef = useRef();

  return (
    <Fragment>
      {
        isConfirmPopperOpen && (
          <ConfirmClose
            isConfirmPopperOpen={isConfirmPopperOpen}
            confirmAnchorEl={confirmAnchorEl}
            confirmPlacement={confirmPlacement}
            handleCloseConfirmPopOver={handleCloseConfirmPopOver}
            handleClosePaymentDialog={handleClosePaymentDialog}
          />
        )
      }
      <Grid container justify="center" style={salesDialogStyles.receiptContainerGrid}>
        <Paper style={salesDialogStyles.receiptPaper}>
          <Grid item container xs={12}>
            <RecieptTemplate
              ref={componentRef}
              me={me}
              products={products}
              cashRecieved={cashRecieved}
              balanceDue={balanceDue}
              barcodeUrl={barcodeUrl}
              receiptNo={receiptNo}
              registerID={registerID}
              tradingName={tradingName}
              country={country}
              city={city}
              phoneNumber={phoneNumber}
              addressLine1={addressLine1}
              computedSubTotal={computedSubTotal}
              computedTotal={computedTotal}
              computedDiscount={computedDiscount}
            />
          </Grid>
        </Paper>

        <Grid item container justify="space-evenly" xs={12}>
          <Grid item xs={4} style={salesDialogStyles.printGridItem}>
            <div>
              <ReactToPrint
                trigger={() => (
                  <IconButton id="print-button" style={salesDialogStyles.printIconButton}>
                    <img src={print} alt="" style={salesDialogStyles.printImage} />
                  </IconButton>
                )
                }
                content={() => componentRef.current}
              />
              <Typography variant="h6" style={salesDialogStyles.printText}>Print</Typography>
            </div>
          </Grid>

          <Grid item xs={4} style={salesDialogStyles.printGridItem}>
            <IconButton disabled style={salesDialogStyles.printIconButton}>
              <img src={email} alt="" style={salesDialogStyles.printImage} />
            </IconButton>
            <Typography variant="h6" style={salesDialogStyles.printText}>Email</Typography>
          </Grid>

          <Grid item xs={4} style={salesDialogStyles.printGridItem}>
            <IconButton
              style={salesDialogStyles.printIconButton}
              onClick={handleDisplayConfirmPopOver}
            >
              <img src={none} alt="" style={salesDialogStyles.printImage} />
            </IconButton>
            <Typography variant="h6" style={salesDialogStyles.printText}>Close</Typography>
          </Grid>

        </Grid>

      </Grid>
    </Fragment>
  );
};

RecieptScreen.propTypes = {
  me: PropTypes.instanceOf(Object).isRequired,
  confirmAnchorEl: PropTypes.shape({ subProp: PropTypes.object }).isRequired,
  confirmPlacement: PropTypes.string.isRequired,
  isConfirmPopperOpen: PropTypes.bool.isRequired,
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
  handleDisplayConfirmPopOver: PropTypes.func.isRequired,
  handleCloseConfirmPopOver: PropTypes.func.isRequired,
  handleClosePaymentDialog: PropTypes.func.isRequired,
};

RecieptScreen.defaultProps = {
  registerID: ''
};

export default RecieptScreen;

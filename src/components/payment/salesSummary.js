import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, Divider, Zoom,
  Table, TableBody,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PaymentSummary from './paymentSummary';
import Notes from './notesPopOver';
import PaymentButton from './paymentButton';
import RecieptScreen from './recieptScreen';
import currencyFormatter from './utils/formatter';
import RenderTableHeader from './tableHeader';
import ProductsToSaleList from './productsToSaleList';
import DialogHeader from './dialogTitle';
import ProductTotalsSection from './productTotalsSection';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

const styles = salesDialogStyles;

const SalesSummary = (props) => {
  const {
    classes,
    products,
    me,
    open,
    loading,
    cashChecked,
    cardChecked,
    processing,
    sale,
    cashRecieved,
    balanceDue,
    totalToPay,
    cashConfirmed,
    currency,
    discount,
    isNotesPopperOpen,
    anchorEl,
    placement,
    mainCartNote,
    isConfirmPopperOpen,
    confirmAnchorEl,
    confirmPlacement,
    computedSubTotal,
    computedDiscount,
    barcodeUrl,
    receiptNo,
    registerID,
    tradingName,
    country,
    city,
    phoneNumber,
    addressLine1,
    updatedProducts,
    handleSale,
    handleClosePaymentDialog,
    handleProcessing,
    handlePaymentType,
    handleCashInput,
    handleBackToSalesSummary,
    handleDisplayNotesPopper,
    handleClosePopOver,
    handleDisplayConfirmPopOver,
    handleCloseConfirmPopOver,
    handleBackToSellScreen
  } = props;

  const computedTotal = currencyFormatter(totalToPay);

  return (
    <div>
      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        TransitionComponent={Zoom}
      >
        {
          isNotesPopperOpen && (
            <Notes
              anchorEl={anchorEl}
              placement={placement}
              products={products}
              mainCartNote={mainCartNote}
              isNotesPopperOpen={isNotesPopperOpen}
              handleClosePopOver={handleClosePopOver}
            />
          )
        }
        {
          sale && (
            <RecieptScreen
              me={me}
              barcodeUrl={barcodeUrl}
              receiptNo={receiptNo}
              registerID={registerID}
              tradingName={tradingName}
              country={country}
              city={city}
              phoneNumber={phoneNumber}
              addressLine1={addressLine1}
              products={updatedProducts}
              cashRecieved={cashRecieved}
              balanceDue={balanceDue}
              computedSubTotal={computedSubTotal}
              computedDiscount={computedDiscount}
              computedTotal={computedTotal}
              confirmAnchorEl={confirmAnchorEl}
              confirmPlacement={confirmPlacement}
              isConfirmPopperOpen={isConfirmPopperOpen}
              handleClosePaymentDialog={handleClosePaymentDialog}
              handleDisplayConfirmPopOver={handleDisplayConfirmPopOver}
              handleCloseConfirmPopOver={handleCloseConfirmPopOver}
            />
          )
        }

        {
          !sale && (
            <DialogHeader
              processing={processing}
              handleBackToSalesSummary={handleBackToSalesSummary}
              handleDisplayNotesPopper={handleDisplayNotesPopper}
              handleBackToSellScreen={handleBackToSellScreen}
            />
          )
        }

        {processing && <Divider className={classes.divider} />}

        {
          processing ? (
            <PaymentSummary
              currency={currency}
              cashRecieved={cashRecieved}
              balanceDue={balanceDue}
              totalToPay={computedTotal}
              handleCashInput={handleCashInput}
              cashChecked={cashChecked}
              cardChecked={cardChecked}
            />
          ) : !sale && (
            <Fragment>
              <RenderTableHeader />
              <div className={classes.tableBodyDiv}>
                <Table className={classes.dialogTable}>
                  <colgroup>
                    <col className={classes.dialogTableColumn1} />
                    <col className={classes.dialogTableColumn2} />
                    <col className={classes.dialogTableColumn3} />
                    <col className={classes.dialogTableColumn4} />
                    <col className={classes.dialogTableColumn5} />
                  </colgroup>
                  <TableBody>
                    {
                      updatedProducts.map(
                        product => (
                          <ProductsToSaleList
                            key={product.productName}
                            product={product}
                            currency={currency}
                          />
                        )
                      )
                    }
                  </TableBody>
                </Table>
              </div>
            </Fragment>
          )
        }
        {!sale && <Divider className={classes.divider} />}
        {
          !sale && !processing && (
            <ProductTotalsSection
              discount={discount}
              currency={currency}
              cardChecked={cardChecked}
              cashChecked={cashChecked}
              computedTotal={computedTotal}
              computedSubTotal={computedSubTotal}
              computedDiscount={computedDiscount}
              handlePaymentType={handlePaymentType}
            />
          )
        }

        <PaymentButton
          sale={sale}
          loading={loading}
          processing={processing}
          cashConfirmed={cashConfirmed}
          cardChecked={cardChecked}
          handleSale={handleSale}
          handleProcessing={handleProcessing}
        />

      </Dialog>
    </div>
  );
};

SalesSummary.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  products: PropTypes.arrayOf(Object).isRequired,
  me: PropTypes.instanceOf(Object).isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  cashChecked: PropTypes.bool.isRequired,
  cardChecked: PropTypes.bool.isRequired,
  processing: PropTypes.bool.isRequired,
  sale: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  totalToPay: PropTypes.number.isRequired,
  balanceDue: PropTypes.number.isRequired,
  cashRecieved: PropTypes.string.isRequired,
  cashConfirmed: PropTypes.bool.isRequired,
  discount: PropTypes.number.isRequired,
  isNotesPopperOpen: PropTypes.bool.isRequired,
  anchorEl: PropTypes.instanceOf(Object).isRequired,
  placement: PropTypes.string.isRequired,
  mainCartNote: PropTypes.string.isRequired,
  isConfirmPopperOpen: PropTypes.bool.isRequired,
  confirmAnchorEl: PropTypes.shape({ subProp: PropTypes.object }).isRequired,
  confirmPlacement: PropTypes.string.isRequired,
  computedSubTotal: PropTypes.string.isRequired,
  computedDiscount: PropTypes.string.isRequired,
  barcodeUrl: PropTypes.string.isRequired,
  receiptNo: PropTypes.string.isRequired,
  registerID: PropTypes.string,
  tradingName: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  addressLine1: PropTypes.string.isRequired,
  updatedProducts: PropTypes.arrayOf(Object),
  handleSale: PropTypes.func.isRequired,
  handleClosePaymentDialog: PropTypes.func.isRequired,
  handleProcessing: PropTypes.func.isRequired,
  handlePaymentType: PropTypes.func.isRequired,
  handleCashInput: PropTypes.func.isRequired,
  handleBackToSalesSummary: PropTypes.func.isRequired,
  handleDisplayNotesPopper: PropTypes.func.isRequired,
  handleClosePopOver: PropTypes.func.isRequired,
  handleDisplayConfirmPopOver: PropTypes.func.isRequired,
  handleCloseConfirmPopOver: PropTypes.func.isRequired,
  handleBackToSellScreen: PropTypes.func.isRequired
};

SalesSummary.defaultProps = {
  registerID: '',
  updatedProducts: [{}]
};

export default withStyles(styles)(SalesSummary);

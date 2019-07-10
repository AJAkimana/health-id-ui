import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import currencyFormatter from '../utils/formatter';
import notify from '../../shared/Toaster';
import SalesSummary from '../salesSummary';
import CREATE_SALE_MUTATION from '../../../mutations/sellScreen/createSaleMutation';

export class PaymentContainer extends Component {
    state = {
      processing: false,
      sale: false,
      cardChecked: false,
      cashChecked: true,
      cashRecieved: '',
      balanceDue: 0,
      cashConfirmed: false,
      isNotesPopperOpen: false,
      anchorEl: {},
      placement: '',
      isConfirmPopperOpen: false,
      confirmAnchorEl: {},
      confirmPlacement: '',
      loading: false,
      receiptNo: '',
      barcodeUrl: '',
      city: '',
      country: '',
      phoneNumber: '',
      tradingName: '',
      registerID: '',
      addressLine1: ''
    };

  handlePaymentType = (event) => {
    if (event.target.id === 'card') {
      this.setState({ cashChecked: false, cardChecked: true });
    } else {
      this.setState({ cardChecked: false, cashChecked: true });
    }
  };

  handleProcessing = () => {
    this.setState({ processing: true });
  };

  processCashBalance = (cashValue) => {
    const isValid = this.validateCashPayment(cashValue);
    const { totalToPay } = this.props;

    if (isValid) {
      const balance = cashValue - totalToPay;
      this.setState({ balanceDue: balance, cashConfirmed: true });
    } else {
      this.setState({ balanceDue: 0, cashConfirmed: false });
    }
  };

  handleCashInput = (event) => {
    this.processCashBalance(event.target.value);
    this.setState({ cashRecieved: event.target.value });
  }

  validateCashPayment = (cashValue) => {
    const { totalToPay } = this.props;
    return cashValue >= totalToPay;
  }

  handleBackToSalesSummary = () => (
    this.setState(state => ({
      ...state, processing: false
    }))
  )

  handleDisplayNotesPopper = (event) => {
    const { currentTarget } = event;

    this.setState({
      isNotesPopperOpen: true,
      anchorEl: currentTarget,
      placement: 'bottom'
    });
  }

  handleClosePopOver = () => (
    this.setState({
      isNotesPopperOpen: false,
      anchorEl: {},
      placement: ''
    })
  );

  handleDisplayConfirmPopOver = (event) => {
    const { currentTarget } = event;
    this.setState({
      isConfirmPopperOpen: true,
      confirmAnchorEl: currentTarget,
      confirmPlacement: 'top'
    });
  }

  handleCloseConfirmPopOver = () => (
    this.setState({
      isConfirmPopperOpen: false,
      confirmAnchorEl: {},
      confirmPlacement: '',
      selectedCustomer: ''
    })
  );

  filterMutationProducts = products => products.map(({
    id, quantity, discount, salesPrice, note
  }) => ({
    productId: id, quantity, discount, price: salesPrice, note
  }))

  productTotals = () => {
    const { renderCartDiscount, renderCartTotal, products } = this.props;
    const computedDiscountTotal = currencyFormatter(renderCartDiscount(products));
    const computedSubTotal = currencyFormatter(renderCartTotal(products));
    return { computedDiscountTotal, computedSubTotal };
  }

  processReceiptData = (data) => {
    const { createSale } = data;
    const { receipt, sale } = createSale;
    const { barcodeUrl, receiptNo } = receipt;
    const { outlet } = sale;
    const { registerSet, business } = outlet;
    const { id } = registerSet;
    const {
      tradingName,
      country,
      city,
      phoneNumber,
      addressLine1,
    } = business;

    this.setState({
      barcodeUrl,
      receiptNo,
      registerID: id,
      tradingName,
      country,
      city,
      phoneNumber,
      addressLine1,
      loading: false,
      sale: true,
      processing: false,
    });
  };

  handleCreateSale = () => {
    const {
      cashChecked,
      balanceDue,
      cashRecieved,
    } = this.state;

    const {
      createSale, outletId, selectedCustomer,
      mainCartNote, totalToPay, products
    } = this.props;

    this.setState({ loading: true });
    const mutationProducts = this.filterMutationProducts(products);

    const mutationVariables = {
      amountToPay: parseFloat(totalToPay),
      changeDue: parseFloat(balanceDue),
      customerId: selectedCustomer !== '' ? selectedCustomer.id : null,
      discountTotal: parseFloat(this.productTotals().computedDiscountTotal),
      notes: mainCartNote,
      outletId,
      paidAmount: parseFloat(cashRecieved || totalToPay),
      paymentMethod: cashChecked ? 'cash' : 'card',
      subTotal: parseFloat(this.productTotals().computedSubTotal),
      products: mutationProducts,
    };

    createSale({
      variables: mutationVariables
    }).then((results) => {
      this.processReceiptData(results.data);
      notify(results.data.createSale.message);
    }).catch((error) => {
      this.setState({ loading: false });
      notify(error.message.slice(15));
    });
  };

  handleSale = () => {
    this.handleCreateSale();
  };

  render() {
    const {
      cashChecked, cardChecked, processing, sale,
      cashRecieved, balanceDue, cashConfirmed,
      isNotesPopperOpen, anchorEl, placement, isConfirmPopperOpen,
      confirmAnchorEl, confirmPlacement, loading, barcodeUrl,
      receiptNo, registerID, tradingName, country, city,
      phoneNumber, addressLine1, addressLine2,
    } = this.state;

    const {
      renderCartTotal,
      handleClosePaymentDialog,
      handleBackToSellScreen,
      renderCartDiscount,
      updateItems,
      openPaymentDialog,
      currency,
      products,
      discount,
      totalToPay,
      mainCartNote,
      me
    } = this.props;

    return (
      <SalesSummary
        me={me}
        updatedProducts={updateItems(products)}
        barcodeUrl={barcodeUrl}
        receiptNo={receiptNo}
        registerID={registerID}
        tradingName={tradingName}
        country={country}
        city={city}
        phoneNumber={phoneNumber}
        addressLine1={addressLine1}
        addressLine2={addressLine2}
        open={openPaymentDialog}
        sale={sale}
        loading={loading}
        currency={currency}
        products={products}
        discount={discount}
        cashChecked={cashChecked}
        cardChecked={cardChecked}
        processing={processing}
        cashRecieved={cashRecieved}
        balanceDue={balanceDue}
        totalToPay={totalToPay}
        cashConfirmed={cashConfirmed}
        isNotesPopperOpen={isNotesPopperOpen}
        anchorEl={anchorEl}
        placement={placement}
        mainCartNote={mainCartNote}
        isConfirmPopperOpen={isConfirmPopperOpen}
        confirmAnchorEl={confirmAnchorEl}
        confirmPlacement={confirmPlacement}
        computedDiscount={this.productTotals().computedDiscountTotal}
        computedSubTotal={this.productTotals().computedSubTotal}
        handlePaymentType={this.handlePaymentType}
        handleSale={this.handleSale}
        handleProcessing={this.handleProcessing}
        handleCashInput={this.handleCashInput}
        handleClosePaymentDialog={handleClosePaymentDialog}
        renderCartTotal={renderCartTotal}
        renderCartDiscount={renderCartDiscount}
        handleBackToSalesSummary={this.handleBackToSalesSummary}
        handleDisplayNotesPopper={this.handleDisplayNotesPopper}
        handleClosePopOver={this.handleClosePopOver}
        handleDisplayConfirmPopOver={this.handleDisplayConfirmPopOver}
        handleCloseConfirmPopOver={this.handleCloseConfirmPopOver}
        handleBackToSellScreen={handleBackToSellScreen}
      />

    );
  }
}

PaymentContainer.propTypes = {
  me: PropTypes.instanceOf(Object),
  openPaymentDialog: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(Object).isRequired,
  handleClosePaymentDialog: PropTypes.func.isRequired,
  handleBackToSellScreen: PropTypes.func.isRequired,
  renderCartTotal: PropTypes.func.isRequired,
  renderCartDiscount: PropTypes.func.isRequired,
  updateItems: PropTypes.func.isRequired,
  totalToPay: PropTypes.number.isRequired,
  discount: PropTypes.number,
  mainCartNote: PropTypes.string.isRequired,
  createSale: PropTypes.func.isRequired,
  outletId: PropTypes.string.isRequired,
};

PaymentContainer.defaultProps = {
  me: {},
  discount: 0
};

export default graphql(CREATE_SALE_MUTATION, { name: 'createSale' })(PaymentContainer);

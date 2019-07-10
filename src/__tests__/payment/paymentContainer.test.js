import React from 'react';
import { shallow } from 'enzyme';
import { PaymentContainer } from '../../components/payment/container/paymentContainer';

const props = {
  openPaymentDialog: false,
  products: [
    {
      id: 3,
      productName: 'test product',
      quantity: 8,
      productPrice: 1500,

    }
  ],
  currency: '$',
  totalToPay: 1500,
  discount: 0,
  selectedCustomer: {
    id: 2,
    username: 'tester',
    firstName: 'now',
    lastName: 'then',
    phoneNumber: ''
  },
  me: {
    firstName: 'user',
    lastName: 'me-user'
  },
  mainCartNote: '',
  outletId: 5,
  handleClosePaymentDialog: jest.fn(),
  renderCartTotal: jest.fn(),
  renderCartDiscount: jest.fn(),
  updateItems: jest.fn(),
  handleBackToSellScreen: jest.fn(),
  createSale: jest.fn(() => Promise.resolve()),
};

const cardEvent = {
  target: {
    id: 'card'
  }
};

const cashEvent = {
  target: {
    id: 'cash'
  }
};

const balanceDueEvent = {
  target: {
    value: 3000
  }
};

const invalidBalanceDueEvent = {
  target: {
    value: 1000
  }
};

const notesPopOverEvent = {
  currentTarget: {}
};

const products = [
  {
    productName: 'Paracetamol',
    salesPrice: '500',
    quantity: 2,
    discount: 0,
    note: '',
    id: 23
  },
  {
    productName: 'Ventolin',
    salesPrice: '500',
    quantity: 12,
    discount: 0,
    note: '',
    id: 34
  },
];

const recieptData = {
  createSale: {
    receipt: {
      barcodeUrl: 'some url for the barcode image',
      receiptNo: '3456789'
    },
    sale: {
      outlet: {
        registerSet: {
          id: 4
        },
        business: {
          tradingName: 'some trading name',
          country: 'uganda',
          city: 'kampala',
          phoneNumber: '23456778',
          addressLine1: 'plot 45, kanjokya street',
        }
      }
    },

  }
};

describe('test payment container component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow((
      <PaymentContainer {...props} />
    ));
  });

  it('it calls handlePaymentType method to update state with a cash value', () => {
    wrapper.instance().handlePaymentType(cardEvent);
    expect(wrapper.state('cardChecked')).toBeTruthy();
    expect(wrapper.state('cashChecked')).toBeFalsy();
  });

  it('it calls handlePaymentType method to update state with a card value', () => {
    wrapper.instance().handlePaymentType(cashEvent);
    expect(wrapper.state('cashChecked')).toBeTruthy();
    expect(wrapper.state('cardChecked')).toBeFalsy();
  });

  it('it calls handleProcessing method and updates state with a truthy value', () => {
    wrapper.instance().handleProcessing();
    expect(wrapper.state('processing')).toBeTruthy();
  });

  it('it calls handleCashInput method with a valid cash input to compute cash balance for a client', () => {
    wrapper.instance().handleCashInput(balanceDueEvent);
    expect(wrapper.state('cashConfirmed')).toBeTruthy();
    expect(wrapper.state('balanceDue')).toEqual(1500);
  });

  it('it calls handleCashInput method with an invalid cash input to compute cash balance for a client', () => {
    wrapper.instance().handleCashInput(invalidBalanceDueEvent);
    expect(wrapper.state('cashConfirmed')).toBeFalsy();
    expect(wrapper.state('balanceDue')).toEqual(0);
  });

  it('it calls handleBackToSalesSummary method to set processing state property to false', () => {
    wrapper.instance().handleBackToSalesSummary();
    expect(wrapper.state('processing')).toBeFalsy();
  });

  it('it calls handleDisplayNotesPopper method to set the node anchor and placement values', () => {
    wrapper.instance().handleDisplayNotesPopper(notesPopOverEvent);
    expect(wrapper.state('isNotesPopperOpen')).toBeTruthy();
    expect(wrapper.state('placement')).toEqual('bottom');
  });

  it('it calls handleClosePopOver method to set the node anchor and placement values to false', () => {
    wrapper.instance().handleClosePopOver();
    expect(wrapper.state('isNotesPopperOpen')).toBeFalsy();
    expect(wrapper.state('placement')).toEqual('');
  });

  it('it calls handleDisplayConfirmPopOver method to set the node anchor and placement values', () => {
    wrapper.instance().handleDisplayConfirmPopOver(notesPopOverEvent);
    expect(wrapper.state('isConfirmPopperOpen')).toBeTruthy();
    expect(wrapper.state('confirmPlacement')).toEqual('top');
  });

  it('it calls handleCloseConfirmPopOver method to set the node anchor and placement values to fasle', () => {
    wrapper.instance().handleCloseConfirmPopOver();
    expect(wrapper.state('isConfirmPopperOpen')).toBeFalsy();
    expect(wrapper.state('confirmPlacement')).toEqual('');
    wrapper.instance().handleSale();
  });

  it('it calls filterMutationProducts method to map through an array of products', () => {
    const spy = jest.spyOn(wrapper.instance(), 'filterMutationProducts');
    wrapper.instance().filterMutationProducts(products);
    expect(spy).toHaveBeenCalled();
  });

  it('it calls  processReceiptData method to set state properties based on the recieved data', () => {
    wrapper.instance().processReceiptData(recieptData);
    expect(wrapper.state('tradingName')).toEqual('some trading name');
    expect(wrapper.state('country')).toEqual('uganda'); 
  });
});

import React from 'react';
import { mount, shallow } from 'enzyme';
import { IconButton } from '@material-ui/core';
import RecieptScreen from '../../components/payment/recieptScreen';

const props = {
  products: [
    {
      productName: 'Paracetamol',
      salesPrice: '500',
      quantity: 2,
      discount: 0,
      note: '',
      id: 23,
      discountedTotal: 1000,
      dispensingSize: {
        name: 'tablets'
      }
    },
    {
      productName: 'Ventolin',
      salesPrice: '500',
      quantity: 12,
      discount: 0,
      note: '',
      id: 34,
      discountedTotal: 1000,
      dispensingSize: {
        name: 'tablets'
      }
    },
  ],
  me: {
    firstName: 'user',
    lastName: 'me-user'
  },
  cashRecieved: '1000',
  balanceDue: 0,
  computedSubTotal: '1000',
  computedDiscount: '0',
  computedTotal: '1000',
  barcodeUrl: '',
  receiptNo: '2345',
  registerID: '34',
  tradingName: '',
  country: 'uganda',
  city: 'kampala',
  phoneNumber: '234567890',
  addressLine1: 'plot 34 rubaga',
  confirmAnchorEl: { id: '34' },
  confirmPlacement: 'top',
  isConfirmPopperOpen: false,
  handleClosePaymentDialog: jest.fn(),
  handleDisplayConfirmPopOver: jest.fn(),
  handleCloseConfirmPopOver: jest.fn(),
};

describe('test RecieptScreen', () => {
  it('it renders correctly provided it has all the required props', () => {
    const wrapper = mount((
      <RecieptScreen {...props} />
    ));
    wrapper.find('#print-button').at(0).simulate('click');
    expect(wrapper.find(IconButton).length).toBe(3);
  });

  it('it renders a confirm close button', () => {
    props.isConfirmPopperOpen = true;
    const wrapper = shallow((
      <RecieptScreen {...props} />
    ));
    expect(wrapper.find('ConfirmClose').length).toBe(1);
  });
});

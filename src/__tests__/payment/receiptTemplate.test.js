import React from 'react';
import { shallow } from 'enzyme';
import { Table } from '@material-ui/core';
import RecieptTemplate from '../../components/payment/recieptTemplate';
import dateFormatter from '../../components/payment/utils/dateFormatter';

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
      measurementUnit: {
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
      measurementUnit: {
        name: 'tablets'
      }
    }
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
  addressLine1: 'plot 34 rubaga'
};

describe('test RecieptTemplatecomponent', () => {
  it('it renders correctly provided it has all the required props', () => {
    const wrapper = shallow(<RecieptTemplate {...props} />);
    dateFormatter(new Date('Wed Jul 17 2019 11:05:16 GMT+0300 (East Africa Time)'));
    expect(wrapper.find(Table).length).toBe(1);
  });
  it('it renders correctly provided it has all the required props', () => {
    const newProps = {
      ...props,
      registerID: null,
      me: {
        firstName: '',
        lastName: ''
      }
    };
    const wrapper = shallow(<RecieptTemplate {...newProps} />);
    dateFormatter(new Date('Wed Jul 17 2019 11:05:16 GMT+0300 (East Africa Time)'));
    expect(wrapper.find(Table).length).toBe(1);
  });
});

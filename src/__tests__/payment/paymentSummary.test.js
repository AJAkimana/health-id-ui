import React from 'react';
import { mount } from 'enzyme';
import { DialogContent } from '@material-ui/core';
import PaymentSummary from '../../components/payment/paymentSummary';

const props = {
  classes: {},
  currency: '$',
  totalToPay: '1000',
  balanceDue: '0',
  cashRecieved: '1000',
  cashChecked: true,
  cardChecked: false,
  handleCashInput: jest.fn(),
};
describe('test PaymentSummary component', () => {
  it('it renders correctly provided it has all the required props', () => {
    const wrapper = mount((
      <PaymentSummary {...props} />
    ));
    expect(wrapper.find(DialogContent).length).toBe(1);
  });
});

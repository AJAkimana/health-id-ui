import React from 'react';
import { mount } from 'enzyme';
import { Button } from '@material-ui/core';
import PaymentButton from '../../components/payment/paymentButton';

const props = {
  sale: false,
  classes: {},
  processing: false,
  cardChecked: false,
  handleSale: jest.fn(),
  cashConfirmed: true,
  loading: false,
  handleProcessing: jest.fn()
};
describe('test ConfirmClose component', () => {
  it('it renders correctly provided it has all the required props', () => {
    const wrapper = mount((
      <PaymentButton {...props} />
    ));
    expect(wrapper.find(Button).length).toBe(1);
  });
});

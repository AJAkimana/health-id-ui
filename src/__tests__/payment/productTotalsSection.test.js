import React from 'react';
import { mount } from 'enzyme';
import { List, FormControlLabel } from '@material-ui/core';
import ProductTotalsSection from '../../components/payment/productTotalsSection';

const props = {
  discount: 0,
  currency: '$',
  classes: {},
  cashChecked: false,
  cardChecked: false,
  computedSubTotal: '1000',
  computedDiscount: '0',
  computedTotal: '1000',
  handlePaymentType: jest.fn(),
};

describe('test ProductTotalsSection component', () => {
  it('it renders correctly provided it has all the required props', () => {
    const wrapper = mount((
      <ProductTotalsSection {...props} />
    ));
    expect(wrapper.find(FormControlLabel).length).toBe(2);
    expect(wrapper.find(List).length).toBe(2);
  });
});

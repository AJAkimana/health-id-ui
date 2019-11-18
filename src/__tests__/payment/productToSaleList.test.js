import React from 'react';
import { shallow } from 'enzyme';
import { Typography, TableRow } from '@material-ui/core';
import ProductsToSaleList from '../../components/payment/productsToSaleList';

const props = {
  product: {
    productName: 'Paracetamol',
    salesPrice: '500',
    quantity: 2,
    discount: 0,
    note: '',
    id: 23,
    discountedTotal: 1000,
    dispensingSize: {
      name: 'tablets'
    },
  },
  currency: '$'
};

describe('test productToSaleList component', () => {
  it('it renders correctly provided it has all the required props', () => {
    const wrapper = shallow((
      <ProductsToSaleList {...props} />
    ));
    expect(wrapper.find(Typography).length).toBe(1);
    expect(wrapper.find(TableRow).length).toBe(1);
  });
});

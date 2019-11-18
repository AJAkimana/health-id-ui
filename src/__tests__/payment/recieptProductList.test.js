import React from 'react';
import { shallow } from 'enzyme';
import { TableCell, TableRow } from '@material-ui/core';
import RecieptProductList from '../../components/payment/recieptProductList';

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
};

describe('test RecieptProductList component', () => {
  it('it renders correctly provided it has all the required props', () => {
    const wrapper = shallow((
      <RecieptProductList {...props} />
    ));
    expect(wrapper.find(TableCell).length).toBe(3);
    expect(wrapper.find(TableRow).length).toBe(1);
  });
});

import React from 'react';
import { mount } from 'enzyme';
import SalesOnHoldDialog from '../../../components/sell/salesOnHoldDialog';

const props = {
  state: {
    openSalesOnHoldDialog: false,
    salesOnHold: [{
      mainCartNote: '',
      cartItems: [{
        id: 1,
        productName: '',
        quantity: ''
      }]
    }],
  },
  handleCartNoteDialogClose: jest.fn(),
  handleReturnSaleToCart: jest.fn(),
};
describe('test SalesOnHoldDialog component', () => {
  let wrapper;
  it('it renders SalesOnHoldDialog component', () => {
    wrapper = mount((
      <SalesOnHoldDialog {...props} />
    ));
    const dialog = wrapper.find('Dialog').length;
    expect(dialog).toBe(1);
  });
});

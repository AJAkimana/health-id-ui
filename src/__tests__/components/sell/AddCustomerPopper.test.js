import React from 'react';
import { mount } from 'enzyme';
import { AddCustomerPopper } from '../../../components/sell/addCustomerPopper';

const props = {
  state: {
    openCustomerPopper: false,
    customerAnchorEl: '',
    placement: '',
    filteredCustomers: [{ id: 1, name: '' }],
    firstName: ''
  },
  handleAddNewCustomer: jest.fn(),
  renderSingleCustomer: jest.fn(),
  handleCustomerPopperClickAway: jest.fn(),
};
describe('test AddCustomerPopper component', () => {
  let wrapper;
  it('it renders AddCustomerPopper component', () => {
    wrapper = mount((
      <AddCustomerPopper {...props} />
    ));
    const popper = wrapper.find('Popper').length;
    expect(popper).toBe(1);
  });
});

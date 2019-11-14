import React from 'react';
import { mount } from 'enzyme';
import { ContactDetails } from '../../components/sell/contactDetails';

describe('ContactDetails', () => {
  const selectedCustomer = {
    email: 'jo@co.com',
    primaryMobileNumber: '123',
    secondaryMobileNumber: '123',
    addressLine1: 'jinja',
    localGovernmentArea: 'central',
    city: 'kla',
    country: 'ug',
    saleSet: [
      { createdAt: '2019-07-31T14:15:14.151419+00:00' },
      { createdAt: '2019-06-31T14:15:14.151419+00:00' }
    ]
  }
  const props = {
    state: {
      selectedCustomer
    },
    renderDateRange: jest.fn()
  };
  const wrapper = mount(<ContactDetails {...props} />)

  it('renders without crashing', () => {
    expect(wrapper.find('WithStyles(Grid)').length).toBe(11);
  });

  it('renders with null customer information', () => {
    wrapper.setProps({
      state: { selectedCustomer: { ...selectedCustomer, email: '' } }
    })
    expect(wrapper.find('WithStyles(Grid)').length).toBe(11);
  });

  it('renders with null saleSet', () => {
    wrapper.setProps({
      state: { selectedCustomer: { ...selectedCustomer, saleSet: [] } }
    })
    expect(wrapper.find('WithStyles(Grid)').length).toBe(11);
  });
});

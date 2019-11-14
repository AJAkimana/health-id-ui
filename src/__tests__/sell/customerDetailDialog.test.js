import React from 'react';
import { mount } from 'enzyme';
import { CustomerDetailDialog } from '../../components/sell/customerDetailDialog';

describe('CustomerDetailDialog', () => {
  const selectedCustomer = {
    createdAt: '2019-07-01T14:15:14.151419+00:00',
    id: '1',
    firstName: 'John',
    lastName: 'Paul',
    email: 'jo@co.com',
    primaryMobileNumber: '123',
    secondaryMobileNumber: '123',
    addressLine1: 'jinja',
    localGovernmentArea: 'central',
    city: 'kla',
    country: 'ug',
    emergencyContactName: 'john',
    emergencyContactEmail: 'john@co.ug',
    emergencyContactNumber: '123',
    loyaltyMember: false,
    loyaltyPoints: 0,
    wallet: [{ storeCredit: 0 }],
    saleSet: [
      { createdAt: '2019-07-01T14:15:14.151419+00:00' },
      { createdAt: '2019-06-01T14:15:14.151419+00:00' }
    ]
  }
  const props = {
    state: {
      openCustomerDetailsDialog: true,
      selectedCustomer
    },
    handleCustomerDialogClose: jest.fn(),
    handleEditSelectedCustomer: jest.fn(),
    renderDateRange: jest.fn(),
  }
  const wrapper = mount(<CustomerDetailDialog {...props} />)

  it('renders without crashing', () => {
    expect(wrapper.find('Dialog').length).toBe(1);
  });

  it('renders "ContactHeader"', () => {
    const header = wrapper.find('ContactHeader')
    expect(header.length).toBe(1);
  })

  it('renders "LoyaltyPaper"', () => {
    const paper = wrapper.find('LoyaltyPaper')
    expect(paper.length).toBe(1);
  })

  it('renders "ContactDetails"', () => {
    const details = wrapper.find('ContactDetails')
    expect(details.length).toBe(1);
  })

  it('renders "EmergencyContact"', () => {
    const contact = wrapper.find('EmergencyContact')
    expect(contact.length).toBe(1);
  })
});

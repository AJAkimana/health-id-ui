import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import AddCustomerDialog from '../../../components/sell/addCustomerDialog';
import CREATE_CUSTOMER from '../../../mutations/sellScreen/createCustomerMutation';
import EDIT_CUSTOMER from '../../../mutations/sellScreen/editCustomerMutation';

const state = {
  openCustomerDialog: '',
  firstName: '',
  lastName: '',
  email: '',
  primaryMobileNumber: '',
  secondaryMobileNumber: '',
  loyaltyMember: '',
  isLoading: '',
  nameHelper: '',
  emailHelper: '',
  phoneHelper: '',
  mobileHelper: '',
  nameError: '',
  emailError: '',
  phoneError: '',
  mobileError: '',
  address: '',
  region: '',
  city: '',
  cities: [{ id: 1, name: '' }],
  country: '',
  countries: [{ id: 2, name: '' }],
  emergencyContactName: '',
  emergencyContactEmail: '',
  emergencyContactNumber: '',
  isSelected: '',
};
const props = {
  state,
  handleCustomerDialogClose: jest.fn(),
  handleCustomerDialogInPutChange: jest.fn(),
  handleAddCustomerButton: jest.fn(),
  validateCustomerDialogInputs: jest.fn(),
  updateCustomers: jest.fn(),
};
describe('test addCustomerDialog component', () => {
  let wrapper;

  it('should render without fail', () => {
    wrapper = mount((
      <MockedProvider mocks={[]}>
        <AddCustomerDialog {...props} />
      </MockedProvider>
    ));
    const mutation = wrapper.find('Mutation').length;
    expect(mutation).toBe(2);
  });
  it('should render loading state initially', () => {
    const createCustomer = {
      customer: {
        addressLine1: null,
        city: {
          id: '6',
          name: 'Abuja'
        },
        country: {
          id: '3',
          name: 'Nigeria'
        },
        email: null,
        emergencyContactEmail: null,
        emergencyContactName: null,
        emergencyContactNumber: null,
        firstName: 'Dan',
        id: '81',
        lastName: 'Abedi',
        localGovernmentArea: null,
        loyaltyMember: false,
        primaryMobileNumber: null,
        secondaryMobileNumber: null,
      },
      message: 'Customer Created successfully'
    };
    const mocks = [
      {
        request: {
          query: CREATE_CUSTOMER,
          variables: {
            cityId: 1,
            countryId: 3,
            email: '',
            emergencyContactEmail: '',
            emergencyContactName: '',
            emergencyContactNumber: '',
            firstName: '',
            lastName: '',
            loyaltyMember: false,
            primaryMobileNumber: '',
            secondaryMobileNumber: ''
          },
        },
        result: { data: { createCustomer } },
      },
    ];
    wrapper = mount((
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddCustomerDialog {...props} />
      </MockedProvider>
    ));
  });
});

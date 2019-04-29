import React from 'react';
import { shallow } from 'enzyme';
import AdminSetUp from '../components/setup/adminSetup';

const props = {
  state: {
    firstName: 'firstname',
    lastName: 'lastname',
    email: 'email',
    username: 'username',
    secondaryEmail: 'business email',
    secondaryPhoneNumber: 'secondary phone number',
    mobileNumber: 'mobile number',
    formError: 'form error',
    isError: 'isError',
  },
  handleInputChange: jest.fn(),
  checked: jest.fn(),
  errorHandler: jest.fn(),
  serverErrorHandler: jest.fn(),
};

describe('Render adminSetup component', () => {
  it('renders seven text fields', () => {
    const wrapper = shallow(<AdminSetUp {...props} />);
    const textFields = wrapper.find('TextField').length;
    expect(textFields).toBe(7);
  });
});

import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../../components/authentication/Register';

const props = {
  state: {
    password: '', email: '', loading: true, showPassword: '', helperPasswordText: '',
    helperEmailText: '', passwordError: '', EmailError: '', PhoneError: '',
    openAlert: '', checked: '', registerSuccess: '', registerErrors: '', phone: ''
  },
  handlePasswordChange: jest.fn(),
  handlePasswordVisibility: jest.fn(),
  handleEmailChange: jest.fn(),
  handleCloseSignupAlert: jest.fn(),
  handleCheckbox: jest.fn(),
  handlePhoneChange: jest.fn(),
  handleSignup: jest.fn(),
};

describe('Container Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<Router><Register {...props} /></Router>);
  })

  it('renders without crashing', () => {
    expect(wrapper.find('div').length).toBe(19);
  });
});
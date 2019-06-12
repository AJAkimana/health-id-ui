import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../components/authentication/Register';

describe('Register Component', () => {
  it('renders without crashing', () => {
    const props = {
      state: {
        password: '',
        email: '',
        loading: false,
        openRegisterAlert: false,
        checked: false
      },
      handleCloseSignupAlert: jest.fn(),
      
    };
    const wrapper = mount(<Router><Register {...props} /></Router>);
    expect(wrapper.find('TextField').length).toBe(2);
    expect(wrapper.find('PasswordField').length).toBe(1);
  });

  it('renders loader when loading is true', () => {
    const props = {
      state: {
        password: '',
        email: '',
        loading: true,
        openRegisterAlert: false
      },
      handleCloseSignupAlert: jest.fn(),
    };
    const wrapper = mount(<Router><Register {...props} /></Router>);
    expect(wrapper.find('CircularProgress').length).toBe(1);
  });

  it('renders loader when loading is true', () => {
    const props = {
      state: {
        password: 'passW0rd',
        email: 'user@user.com',
        phone: '090098765434',
        passwordError: false,
        EmailError: false,
        PhoneError: false,
        loading: true,
        openRegisterAlert: false,
        checked: true
      },
      handleCloseSignupAlert: jest.fn(), 
    };
    const wrapper = mount(<Router><Register {...props} /></Router>);
    expect(wrapper.find('.register-btn').length).toBe(1);
  });
});

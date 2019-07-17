import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/authentication/Login';

describe('Login Component', () => {
  it('renders without crashing', () => {
    const props = {
      state: {
        loading: false,
        openLoginAlert: false,
        loginSuccess: false,
        checked: false,
        helperPhoneText: '',
        Code: '',
        PhoneError: false
      },
      handleCloseLoginAlert: jest.fn(),
      handlePasswordChange: jest.fn(),
      handlePasswordIcon: jest.fn(),
      handlePasswordVisibility: jest.fn(),
      handleSubmit: jest.fn(),
      handleChangeInput: jest.fn(),
      handleCheckbox: jest.fn(),
      handleEmailChange: jest.fn(),
      handleChange: jest.fn(),
      handlePhoneChange: jest.fn()
    };
    const wrapper = mount(<Router><Login {...props} /></Router>);
    expect(wrapper.find('PasswordField').length).toBe(1);
    expect(wrapper.find('.top-level').length).toBe(1);
  });

  it('renders email tab when selected', () => {
    const props = {
      state: {
        loading: false,
        openLoginAlert: false,
        loginSuccess: false,
        checked: false,
        inputType: 'email',
        Code: '',
        PhoneError: false
      },
      handleCloseLoginAlert: jest.fn(),
      handleChangeInput: jest.fn(),
      handlePasswordChange: jest.fn(),
      handlePasswordIcon: jest.fn(),
      handlePasswordVisibility: jest.fn(),
      handleSubmit: jest.fn(),
      handleCheckbox: jest.fn(),
      handleEmailChange: jest.fn(),
      handleChange: jest.fn(),
      handlePhoneChange: jest.fn()

    };
    const wrapper = mount(<Router><Login {...props} /></Router>);
    expect(wrapper.find('TextField').length).toBe(1);
  });

  it('renders email errors', () => {
    const props = {
      state: {
        loading: false,
        openLoginAlert: false,
        loginSuccess: false,
        checked: false,
        inputType: 'email',
        Code: '',
        PhoneError: false,
        EmailError: 'improper email',
        email: 'bisonlou@gmail.com',
      },
      handleCloseLoginAlert: jest.fn(),
      handleChangeInput: jest.fn(),
      handlePasswordChange: jest.fn(),
      handlePasswordIcon: jest.fn(),
      handlePasswordVisibility: jest.fn(),
      handleSubmit: jest.fn(),
      handleCheckbox: jest.fn(),
      handleEmailChange: jest.fn(),
      handleChange: jest.fn(),
      handlePhoneChange: jest.fn()

    };
    const wrapper = mount(<Router><Login {...props} /></Router>);
    const textFieldWrapper = wrapper.find({ error: 'improper email', value: 'bisonlou@gmail.com' });

    expect(textFieldWrapper.length).toBe(1);
  });

  it('renders phone tab when selected', () => {
    const props = {
      state: {
        loading: false,
        openLoginAlert: false,
        loginSuccess: false,
        checked: false,
        inputType: 'phone',
        Code: '',
        PhoneError: false
      },
      handleCloseLoginAlert: jest.fn(),
      handleChangeInput: jest.fn(),
      handlePasswordChange: jest.fn(),
      handlePasswordIcon: jest.fn(),
      handlePasswordVisibility: jest.fn(),
      handleSubmit: jest.fn(),
      handleCheckbox: jest.fn(),
      handleEmailChange: jest.fn(),
      handleChange: jest.fn(),
      handlePhoneChange: jest.fn()
    };
    const wrapper = mount(<Router><Login {...props} /></Router>);
    expect(wrapper.find('SelectCountry').length).toBe(1);
    expect(wrapper.find('TextField').length).toBe(1);
  });

  it('renders loader when loading is true', () => {
    const props = {
      state: {
        loading: true,
        openLoginAlert: false,
        loginSuccess: false,
        checked: false,
        inputType: 'phone',
        Code: '',
        PhoneError: false
      },
      handleCloseLoginAlert: jest.fn(),
      handleChangeInput: jest.fn(),
      handlePasswordChange: jest.fn(),
      handlePasswordIcon: jest.fn(),
      handlePasswordVisibility: jest.fn(),
      handleSubmit: jest.fn(),
      handleCheckbox: jest.fn(),
      handleEmailChange: jest.fn(),
      handleChange: jest.fn(),
      handlePhoneChange: jest.fn()

    };
    const wrapper = mount(<Router><Login {...props} /></Router>);
    expect(wrapper.find('CircularProgress').length).toBe(1);
  });
});

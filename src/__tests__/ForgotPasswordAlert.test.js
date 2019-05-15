import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ForgotPasswordAlert from '../components/authentication/Alerts/ForgotPasswordAlert';
import { DialogTitle } from '../assets/styles/authentication/AlertStyle';

describe('Register Alert', () => {
  let props = {
    open: true,
    onClose: jest.fn(),
    email: 'user@user.com',
    handleEmailChange: jest.fn(),
    EmailError: false,
    helperEmailText: '',
    handlePasswordReset: jest.fn(),
    loading: false
  }
  it('renders without crashing', () => {
    const wrapper = mount(<Router><ForgotPasswordAlert {...props} /></Router>);
    expect(wrapper.find('Dialog').length).toBe(1);
    expect(wrapper.find('DialogTitle').length).toBe(1);
    expect(wrapper.find('DialogContent').length).toBe(1);
    expect(wrapper.find('.dialog-message').length).toBe(3);
  });

  it('renders Button when loading is false', () => {
    const wrapper = mount(<Router><ForgotPasswordAlert {...props} /></Router>);
    expect(wrapper.find('Button').length).toBe(1);
  });


  it('renders loader when loading is true', () => {
    props = {
      open: true,
      onClose: jest.fn(),
      loading: true
    };
    const wrapper = mount(<Router><ForgotPasswordAlert {...props} /></Router>);
    expect(wrapper.find('CircularProgress').length).toBe(1);
  });

  it('renders close button', () => {
    const props = {
      open: true,
      onClose: jest.fn()
    };
    const wrapper = mount(<DialogTitle {...props} />);
    expect(wrapper.find('CloseIcon').length).toBe(1);
  });

  it('does not render close button if onClose function is non existent', () => {
    const props = {
      open: true,
      onClose: undefined
    };
    const wrapper = mount(<DialogTitle {...props} />);
    expect(wrapper.find('CloseIcon').length).toBe(0);
  });
});

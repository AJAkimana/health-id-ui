import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginAlert from '../components/authentication/Alerts/LoginAlert';

describe('Login Alert', () => {
  it('renders without crashing', () => {
    const props = {
      open: true,
      onClose: jest.fn(),
      success: false
    };
    const wrapper = mount(<Router><LoginAlert {...props} /></Router>);
    expect(wrapper.find('Dialog').length).toBe(1);
    expect(wrapper.find('DialogTitle').length).toBe(1);
    expect(wrapper.find('DialogContent').length).toBe(1);
    expect(wrapper.find('.dialog-message').length).toBe(3);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('.dialog-image').length).toBe(1);
  });

  it('renders upon success', () => {
    const props = {
      open: true,
      onClose: jest.fn(),
      success: true
    };
    const wrapper = mount(<Router><LoginAlert {...props} /></Router>);
    expect(wrapper.find('.successMsg').length).toBe(1);
  });

  it('renders upon error', () => {
    const props = {
      open: true,
      onClose: jest.fn(),
      success: false
    };
    const wrapper = mount(<Router><LoginAlert {...props} /></Router>);
    expect(wrapper.find('.errorMsg').length).toBe(1);
  });
});

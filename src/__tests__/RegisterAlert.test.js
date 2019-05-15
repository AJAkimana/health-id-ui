import React from 'react';
import { mount } from 'enzyme';
import RegisterAlert from '../components/authentication/Alerts/RegisterAlert';
import { DialogTitle } from '../assets/styles/authentication/AlertStyle';

describe('Register Alert', () => {
  it('renders without crashing', () => {
    const props = {
      open: true,
      onClose: jest.fn(),
      email: 'user@user.com',
      success: []
    };
    const wrapper = mount(<RegisterAlert {...props} />);
    expect(wrapper.find('Dialog').length).toBe(1);
    expect(wrapper.find('DialogTitle').length).toBe(1);
    expect(wrapper.find('DialogContent').length).toBe(1);
    expect(wrapper.find('.dialog-message').length).toBe(3);
  });

  it('renders upon success', () => {
    const props = {
      open: true,
      onClose: jest.fn(),
      email: 'user@user.com',
      success: ['message', 'Success']
    };
    const wrapper = mount(<RegisterAlert {...props} />);
    expect(wrapper.find('.successMsg').length).toBe(1);
  });

  it('renders upon error', () => {
    const props = {
      open: true,
      onClose: jest.fn(),
      success: null
    };
    const wrapper = mount(<RegisterAlert {...props} />);
    expect(wrapper.find('.errorMsg').length).toBe(1);
  });

  it('renders close button', () => {
    const props = {
      onClose: jest.fn()
    };
    const wrapper = mount(<DialogTitle {...props} />);
    expect(wrapper.find('CloseIcon').length).toBe(1);
  });
});

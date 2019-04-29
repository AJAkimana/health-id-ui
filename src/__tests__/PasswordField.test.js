import React from 'react';
import { mount } from 'enzyme';
import PasswordField from '../components/authentication/Inputs/PasswordField';

describe('PasswordField', () => {
  it('renders without crashing', () => {
    const props = {
      showPassword: false,
      password: 'passW0rd',
      handlePasswordIcon: jest.fn(),
      handlePasswordChange: jest.fn(),
      error: false,
      helperPasswordText: '',
      visibileEye: { visibility: 'hidden' },
      handlePasswordVisibility: jest.fn(),
    };
    const wrapper = mount(<PasswordField {...props} />);
    expect(wrapper.find('FormControl').length).toBe(1);
    expect(wrapper.find('InputLabel').length).toBe(1);
    expect(wrapper.find('Input').length).toBe(1);
  });

  it('shows Visibility if showPassword is true', () => {
    const props = {
      showPassword: true,
      password: 'passW0rd',
      handlePasswordIcon: jest.fn(),
      handlePasswordChange: jest.fn(),
      error: false,
      helperPasswordText: '',
      visibileEye: { visibility: 'hidden' },
      handlePasswordVisibility: jest.fn(),
    };
    const wrapper = mount(<PasswordField {...props} />);
    expect(wrapper.find('VisibilityIcon').length).toBe(1);
  });

  it('shows VisibilityOff if showPassword is false', () => {
    const props = {
      showPassword: false,
      password: 'passW0rd',
      handlePasswordIcon: jest.fn(),
      handlePasswordChange: jest.fn(),
      error: false,
      helperPasswordText: '',
      visibileEye: { visibility: 'hidden' },
      handlePasswordVisibility: jest.fn(),
    };
    const wrapper = mount(<PasswordField {...props} />);
    expect(wrapper.find('VisibilityOffIcon').length).toBe(1);
  });
});

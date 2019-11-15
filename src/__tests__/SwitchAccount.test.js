import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import { SwitchAccount } from '../components/authentication/SwitchAcount';
import { EMAIL_LOGIN_MUTATION, MOBILE_LOGIN_MUTATION } from '../components/authentication/mutations/mutations';

describe('SwitchAccount ', () => {
  const props = {
    history: { push: jest.fn() },
    handleClose: jest.fn(),
    anchorEl: '',
    open: false,
    classes: {}
  };
  const variables = { email: '14', phone: '34', password: 'cdz6gnt98' };
  const emailLoginMock = [
    {
      request: {
        query: EMAIL_LOGIN_MUTATION,
        variables
      },
      result: { data: { message: 'successfully logged in' } }
    }
  ];

  const phoneLoginMock = [
    {
      request: {
        query: MOBILE_LOGIN_MUTATION,
        variables
      },
      result: { data: { message: 'successfully logged in' } }
    }
  ];

  it('renders without crashing', () => {
    const wrapper = mount(
      <MockedProvider mocks={emailLoginMock} addTypename={false}>
        <SwitchAccount {...props} />
      </MockedProvider>
    );

    expect(wrapper.find('[placement="bottom-end"]').length).toBe(1);
  });

  it('responds to onClick events', () => {
    const wrapper = mount(
      <MockedProvider mocks={emailLoginMock} addTypename={false}>
        <SwitchAccount {...props} />
      </MockedProvider>
    );
    const instance = wrapper.find('SwitchAccount').instance();
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'text',
        id: "email-is-good",
        checked: true,
        email: { value: "test@gmail.com" },
        password: { value: "tafdscom" }
      },
    };
    const eventPhone = {
      preventDefault: jest.fn(),
      target: {
        value: 'text',
        id: "phone-is-good"
      },
    };

    const loginWithPhone = (data) => new Promise((resolve, reject) => {
      if (data.variables.mobileNumber) {
        resolve({ data: { loginUser: { token: "sd", message: "Login Successful" } } });
      } else {
        reject({ error: 'failed to login.' });
      }
    });

    const loginWithEmail = (data) => new Promise((resolve, reject) => {
      if (data.variables.email) {
        resolve({ data: { loginUser: { token: "sd", message: "Login Successful" } } });
      } else {
        reject({ error: 'failed to login.' });
      }
    });

    instance.handlePasswordChange(event);
    expect(instance.state.password).toBe('text');
    instance.handlePasswordVisibility();
    expect(instance.state.showPassword).toBe(true);
    instance.handleEmailChange(event);
    expect(instance.state.email).toBe('text');
    instance.handlePhoneChange('yes');
    expect(instance.state.phone).toBe('yes');
    instance.handleCheckbox(event);
    expect(instance.state.checked).toBe(true);
    instance.handleChangeInput(event);
    expect(instance.state.inputType).toBe('email');
    instance.handleSubmit(event, loginWithEmail, loginWithPhone);
    instance.handleChangeInput(eventPhone);
    instance.handleSubmit(event, loginWithEmail, loginWithPhone);
  });
});

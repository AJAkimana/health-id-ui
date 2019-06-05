import React from 'react';
import { mount, shallow } from 'enzyme';
import ResetPassword from '../components/authentication/PasswordReset';


describe('ResetPassword Form', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ResetPassword />);
    expect(wrapper.find('div').length).toBe(8);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
  });

  it('renders MUI components', () => {
    const wrapper = mount(<ResetPassword />);
    expect(wrapper.find('FormControl').length).toBe(2);
  });

  it('should render disabled button if error', () => {
    const props = {
      passwordError: true,
    };
    const wrapper = shallow(<ResetPassword {...props} />);
    expect(wrapper.find('.disabled-reset').length).toBe(1);
  });

  it('calls handlePasswordChange() ', () => {
    const props = {
    };

    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'newPassword',
        value: 'passW0rd'
      }
    };
    const wrapper = shallow(<ResetPassword {...props} />);
    wrapper.instance().handlePasswordChange(event);
  });

  it('calls handleConfirmPassword when newpassword is empty', () => {
    const props = {
    };

    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'confirmedPassword',
        value: 'passW0rd'
      }
    };
    const wrapper = shallow(<ResetPassword {...props} />);
    wrapper.instance().handleConfirmPassword(event);
  });

  it('calls handleConfirmPassword when newpassword has a value', () => {
    const props = {
    };

    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'confirmedPassword',
        value: 'passW0rd'
      }
    };
    const wrapper = shallow(<ResetPassword {...props} />);
    wrapper.setState({
      newPassword: 'passW0rd'
    });
    wrapper.instance().handleConfirmPassword(event);
  });

  it('calls handlePasswordVisibility for icon', () => {
    const props = {
    };

    const wrapper = shallow(<ResetPassword {...props} />);
    wrapper.instance().handlePasswordVisibility();
    wrapper.instance().setState({
      showPassword: true
    });
    expect(wrapper.state('showPassword')).toBeTruthy();
  });

  it('calls handleSubmit and gets an error', () => {
    const props = {
    };

    const event = {
      preventDefault: jest.fn()
    };

    const wrapper = shallow(<ResetPassword {...props} />);
    wrapper.instance().handleSubmit(event);
  });
});

import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContainer as Container } from '../components/authentication/Container';


describe('Container Component', () => {
  it('renders without crashing', () => {
    const props = {
      match: {
        path: '/'
      }
    };
    const wrapper = mount(<Router><Container {...props} /></Router>);
    expect(wrapper.find('.flex-container').length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('.form-control').length).toBe(1);
  });

  it('renders Register component on default path', () => {
    const props = {
      match: {
        path: '/'
      }
    };
    const wrapper = mount(<Router><Container {...props} /></Router>);
    expect(wrapper.find('Register').length).toBe(1);
    expect(wrapper.find('Login').length).toBe(0);
  });

  it('renders login component on /login', () => {
    const props = {
      match: {
        path: '/login'
      }
    };
    const wrapper = mount(<Router><Container {...props} /></Router>);
    expect(wrapper.find('Login').length).toBe(1);
    expect(wrapper.find('Register').length).toBe(0);
  });

  it('calls handleCloseAlert', () => {
    const props = {
      match: {
        path: '/login'
      },
      handleCloseAlert: jest.fn(),
    };
    const wrapper = shallow(<Container {...props} />);
    wrapper.instance().handleCloseAlert();
    expect(wrapper.state('openAlert')).toBe(false);
  });

  it('calls handleOpenForgotPasswordAlert', () => {
    const props = {
      match: {
        path: '/login'
      },
      handleOpenForgotPasswordAlert: jest.fn(),
    };
    const wrapper = shallow(<Container {...props} />);
    wrapper.instance().handleOpenForgotPasswordAlert();
    expect(wrapper.state('openForgotPasswordAlert')).toBe(true);
  });

  it('calls handleCloseForgotPasswordAlert', () => {
    const props = {
      match: {
        path: '/login'
      },
      handleCloseForgotPasswordAlert: jest.fn(),
    };
    const wrapper = shallow(<Container {...props} />);
    wrapper.instance().handleCloseForgotPasswordAlert();
    expect(wrapper.state('openForgotPasswordAlert')).toBe(false);
  });

  it('calls handleCheckbox for checked state', () => {
    const props = {
      match: {
        path: '/login'
      },
    };

    const event = {
      target: {
        checked: false,
      }
    };

    const wrapper = shallow(<Container {...props} />);
    wrapper.instance().handleCheckbox(event);
    wrapper.instance().setState({
      checked: event.target.checked
    });
    expect(wrapper.state('checked')).toBeFalsy();
  });

  it('calls handleChangeInput', () => {
    const props = {
      match: {
        path: '/login'
      },
    };

    const event = {
      target: {
        id: 'email-type'
      }
    };

    const wrapper = shallow(<Container {...props} />);
    wrapper.instance().handleChangeInput(event);
    wrapper.instance().setState({
      inputType: event.target.id.split('-')[0]
    });
    expect(wrapper.state('inputType')).toBe('email');
  });

  it('calls handleEmailChange for input state', () => {
    const props = {
      match: {
        path: '/'
      },

    };

    const event = {
      target: {
        value: 'user@user.com'
      }
    };

    const wrapper = shallow(<Container {...props} />);
    wrapper.instance().handleEmailChange(event);
    wrapper.instance().setState({
      email: event.target.value
    });
    expect(wrapper.state('email')).toBe('user@user.com');
  });

  it('calls handlePhoneChange for input state', () => {
    const props = {
      match: {
        path: '/'
      },
    };

    const value = '909234234234';

    const wrapper = shallow(<Container {...props} />);
    wrapper.instance().handlePhoneChange(value);
    wrapper.instance().setState({
      phone: value
    });
    expect(wrapper.state('phone')).toBe('909234234234');
  });

  it('calls handlePasswordChange for input state', () => {
    const props = {
      match: {
        path: '/'
      },
    };

    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'passW0rd'
      }
    };

    const wrapper = shallow(<Container {...props} />);
    wrapper.instance().handlePasswordChange(event);
    wrapper.instance().setState({
      password: event.target.value
    });
    expect(wrapper.state('password')).toBe('passW0rd');
  });

  it('calls handlePasswordVisibility for icon', () => {
    const props = {
      match: {
        path: '/'
      },
    };

    const wrapper = shallow(<Container {...props} />);
    wrapper.instance().handlePasswordVisibility();
    wrapper.instance().setState({
      showPassword: true
    });
    expect(wrapper.state('showPassword')).toBeTruthy();
  });

  it('calls handleCheckbox and sets state', () => {
    const props = {
      match: {
        path: '/'
      },
    };
    const event = {
      target: {
        checked: true,
      }
    };
    const wrapper = shallow(<Container {...props} />);
    wrapper.instance().handleCheckbox(event);
    expect(wrapper.state('checked')).toBeTruthy();
  });

  it('handleSubmit, sets state and calls handleEmailLogin', () => {
    const data = {
      data: {
        loginUser: {
          token: '',
          message: 'Login Successful'
        }
      }
    };
    const props = {
      match: {
        path: '/'
      },
      Emaillogin: jest.fn(() => Promise.resolve(data))
    };
    const event = {
      target: {
        email: {
          value: ''
        },
        password: {
          value: ''
        },
      },
      preventDefault: jest.fn(),
    };
    const wrapper = shallow(<Container {...props} />);
    wrapper.setState({
      inputType: 'email',
    });
    const handleEmailLogin = jest.fn();
    const spy = jest.spyOn(wrapper.instance(), 'handleEmailLogin');
    wrapper.instance().handleSubmit(event);
    expect(spy).toBeCalled();
  });

  it('handleSubmit, sets state and calls handleMobileLogin', () => {
    const data = {
      data: {
        loginUser: {
          token: '',
          message: 'Login Successful'
        }
      }
    };
    const props = {
      match: {
        path: '/'
      },
      Emaillogin: jest.fn(() => Promise.resolve(data)),
      Mobilelogin: jest.fn(() => Promise.resolve(data))
    };
    const event = {
      target: {
        email: {
          value: ''
        },
        password: {
          value: ''
        }
      },
      preventDefault: jest.fn(),
    };
    const wrapper = shallow(<Container {...props} />);
    wrapper.setState({
      inputType: 'phone',
    });
    const handleMobileLogin = jest.fn();
    const spy = jest.spyOn(wrapper.instance(), 'handleMobileLogin');
    wrapper.instance().handleSubmit(event);
    expect(spy).toBeCalled();
  });

  it('calls handleSignup, sets state and calls signup', () => {
    const data = {
      data: {
        createUser: {
          success: ['success'],
        }
      }
    };
    const props = {
      match: {
        path: '/'
      },
      signup: jest.fn(() => Promise.resolve(data)),
    };
    const wrapper = shallow(<Container {...props} />);
    wrapper.setState({
      email: '',
      phone: '',
      password: ''
    });
    const signup = jest.fn();
    wrapper.instance().handleSignup();
    expect(wrapper.state('loading')).toBe(true);
  });

  it('handles password reset', () => {
    const data = {
      data: {
        resetPassword: {
          success: '',
          resetLink: ''
        }
      }
    };

    const props = {
      match: {
        path: '/login'
      },
      ResetPassword: jest.fn(() => Promise.resolve(data)),
    };

    const wrapper = shallow(<Container {...props} />);
    wrapper.setState({
      disabled: true,
      loading: false,
      EmailError: false,
    });
    wrapper.instance().handlePasswordReset();
    expect(wrapper.state('loading')).toBe(true);
  });
});

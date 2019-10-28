import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContainer as Container } from '../../components/authentication/Container';
import { StateContext } from '../../providers/stateProvider';

const props = {
  classes: { container: {} },
  match: {
    path: '/'
  }
};

Container.contextTypes = [
  PropTypes.boolean,
  PropTypes.func
];

const context = [true, jest.fn()]

describe('Container Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <StateContext.Provider value={context}>
          <Container {...props} />
        </StateContext.Provider>
      </Router>);
  })

  it('renders without crashing', () => {
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('img').length).toBe(2);
  });

  it('renders Login component on default path', () => {
    expect(wrapper.find('Login').length).toBe(1);
  });

  it('renders register component on /register', () => {
    expect(wrapper.find('Login').length).toBe(1);
  });
});

describe('Container Component', () => {
  const props = {
    classes: { container: {}, bkgImage: {} },
    match: {
      path: '/'
    },
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Container {...props} />, { context });
  })

  it('calls handleCloseAlert', () => {
    wrapper.setProps({ handleCloseAlert: jest.fn() });
    wrapper.instance().handleCloseAlert();
    expect(wrapper.state('openAlert')).toBe(false);
  });

  it('calls handleCloseForgotPasswordAlert', () => {
    const event = { target: { checked: false } };
    wrapper.setProps({ handleCloseForgotPasswordAlert: jest.fn() });
    wrapper.instance().handleCheckbox(event);
    wrapper.instance().setState({
      checked: event.target.checked
    });
    expect(wrapper.state('checked')).toBeFalsy();
  });

  it('calls handleChange for input state', () => {
    const event = {
      target: {
        name: 'email',
        value: 'user@user.com'
      }
    };

    wrapper.instance().handleCheckbox(event);
    wrapper.instance().setState({
      email: 'user@user.com'
    });
    expect(wrapper.state('email')).toBe('user@user.com');
  });

  it('calls handleChangeInput', () => {
    const event = {
      target: {
        id: 'email-type'
      }
    };

    wrapper.instance().handleChangeInput(event);
    wrapper.instance().setState({
      inputType: event.target.id.split('-')[0]
    });
    expect(wrapper.state('inputType')).toBe('email');
  });

  it('calls handleEmailChange for input state', () => {
    const event = {
      target: {
        value: 'user@user.com'
      }
    };

    wrapper.instance().handleEmailChange(event);
    wrapper.instance().setState({
      email: event.target.value
    });
    expect(wrapper.state('email')).toBe('user@user.com');
  });

  it('calls handlePhoneChange for input state', () => {
    const event = {
      target: {
        value: '234234234'
      }
    };

    wrapper.instance().handlePhoneChange(event);
    wrapper.instance().setState({
      phoneNumber: event.target.value
    });
    expect(wrapper.state('phoneNumber')).toBe('234234234');
  });

  it('calls handlePasswordChange for input state', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'passW0rd'
      }
    };

    wrapper.instance().handlePasswordChange(event);
    wrapper.instance().setState({
      password: event.target.value
    });
    expect(wrapper.state('password')).toBe('passW0rd');
  });

  it('calls handlePasswordVisibility for icon', () => {
    wrapper.instance().handlePasswordVisibility();
    wrapper.instance().setState({
      showPassword: true
    });
    expect(wrapper.state('showPassword')).toBeTruthy();
  });

  it('calls handleCheckbox and sets state', () => {
    const event = {
      target: {
        checked: true,
      }
    };
    wrapper.instance().handleCheckbox(event);
    expect(wrapper.state('checked')).toBeTruthy();
  });

  it('handleSubmit, sets state and calls handleEmailLogin', () => {
    const data = {
      data: {
        loginUser: {
          token: '',
          message: 'Login Successful',
          user: { isAdmin: false }
        }
      }
    };
    const event = {
      target: {
        email: {
          value: ''
        },
        password: {
          value: ''
        },
        code: {
          value: ''
        },
        phoneNumber: {
          value: ''
        }
      },
      preventDefault: jest.fn(),
    };

    wrapper.setProps({ Emaillogin: jest.fn(() => Promise.resolve(data)) });
    wrapper.setState({ inputType: 'email' });
    const handleEmailLogin = jest.fn();
    const spy = jest.spyOn(wrapper.instance(), 'handleEmailLogin');
    wrapper.instance().handleSubmit(event);
    expect(spy).toBeCalled();
  });

  it('handleSubmit, sets state and calls handleEmailLogin with an invalid credentails', () => {
    const data = {
      data: {
        loginUser: {
          token: '',
          message: 'Invalid login credentials',
          user: { isAdmin: true }
        }
      }
    };

    const event = {
      target: {
        email: { value: '' },
        password: { value: '' },
        code: { value: '' },
        phoneNumber: { value: '' }
      },
      preventDefault: jest.fn(),
    };

    wrapper.setProps({ Emaillogin: jest.fn(() => Promise.resolve(data)) });
    wrapper.setState({ inputType: 'email' });

    const spy = jest.spyOn(wrapper.instance(), 'handleEmailLogin');
    wrapper.instance().handleSubmit(event);
    expect(spy).toBeCalled();
    expect(wrapper.instance().state.loginErrors).toBeFalsy();
  });

  it('test handleEmailLogin with an error', () => {
    const event = {
      target: {
        email: { value: '' },
        password: { value: '' },
        code: { value: '' },
        phoneNumber: { value: '' }
      },
      preventDefault: jest.fn(),
    };
    wrapper.setProps({ Emaillogin: jest.fn(() => Promise.resolve({})) });
    wrapper.setState({ inputType: 'email' });
    const errorWrapper = shallow(<Container {...props} />, { context });
    const spyOn = jest.spyOn(wrapper.instance(), 'handleEmailLogin');
    wrapper.instance().handleSubmit(event);
    expect(wrapper.instance().state.loginSuccess).toBeFalsy();
  });

  it('handleSubmit, sets state and calls handleMobileLogin', () => {
    const data = {
      classes: { container: {} },
      data: {
        loginUser: {
          token: '',
          message: 'Login Successful',
          user: { isAdmin: true }
        }
      }
    };
    const event = {
      target: {
        email: {
          value: ''
        },
        password: {
          value: ''
        },
        Code: {
          value: ''
        },
        phoneNumber: {
          value: ''
        }
      },
      preventDefault: jest.fn(),
    };
    wrapper.setProps({
      Emaillogin: jest.fn(() => Promise.resolve(data)),
      Mobilelogin: jest.fn(() => Promise.resolve(data))
    });
    wrapper.setState({ inputType: 'phone' });
    const spy = jest.spyOn(wrapper.instance(), 'handleMobileLogin');
    wrapper.instance().handleSubmit(event);
    expect(spy).toBeCalled();
  });

  it('handleSubmit, sets state and calls handleMobileLogin unsuccessfully', () => {
    const data = {
      classes: { container: {} },
      data: {
        loginUser: {
          token: '',
          message: 'Invalid login credentials',
          user: { isAdmin: true }
        }
      }
    };
    const event = {
      target: {
        email: {
          value: ''
        },
        password: {
          value: ''
        },
        Code: {
          value: ''
        },
        phoneNumber: {
          value: ''
        }
      },
      preventDefault: jest.fn(),
    };
    wrapper.setProps({ Mobilelogin: jest.fn(() => Promise.resolve(data)) });
    wrapper.setState({ inputType: 'phone' });
    const spy = jest.spyOn(wrapper.instance(), 'handleMobileLogin');
    wrapper.instance().handleSubmit(event);
    expect(spy).toBeCalled();
    expect(wrapper.instance().state.loginErrors).toBeFalsy();
  });

  it('test handleEmailLogin with an error', () => {
    const data = {
      data: {
        loginUser: {
          token: '',
          message: 'Invalid login credentials',
          user: { isAdmin: true }
        }
      }
    };
    const event = {
      target: {
        email: {
          value: ''
        },
        password: {
          value: ''
        },
        Code: {
          value: ''
        },
        phoneNumber: {
          value: ''
        }
      },
      preventDefault: jest.fn(),
    };
    const errorProps = {
      classes: { container: {}, bkgImage: {} },
      match: {
        path: '/'
      },
      Mobilelogin: jest.fn(() => Promise.resolve({}))
    }
    const errorWrapper = shallow(<Container {...errorProps} />, { context });
    errorWrapper.setState({
      inputType: 'phone',
    });
    const spyOn = jest.spyOn(errorWrapper.instance(), 'handleMobileLogin');
    errorWrapper.instance().handleSubmit(event);
    expect(errorWrapper.instance().state.loginSuccess).toBeFalsy();
  });

  it('calls handleSignup, sets state and calls signup', () => {
    const data = {
      data: {
        createUser: {
          success: ['success'],
        }
      }
    };
    wrapper.setProps({ signup: jest.fn(() => Promise.resolve(data)) });
    wrapper.setState({
      email: '',
      Code: { concat: jest.fn() },
      phoneNumber: 123,
      password: ''
    });
    wrapper.instance().handleSignup();
    expect(wrapper.state('loading')).toBe(true);
  });

  it('calls handleSignup with an error', () => {
    const data = {
      data: {
        createUser: {
          errors: ['errors'],
        }
      }
    };
    wrapper.setProps({ signup: jest.fn(() => Promise.resolve(data)) });
    wrapper.setState({
      Code: { concat: jest.fn() },
      phoneNumber: 0,
      password: ''
    });
    wrapper.instance().handleSignup();
    expect(wrapper.instance().state.openAlert).toBe(false);
  });

  it('calls handleOpenForgotPasswordAlert and sets state', () => {
    wrapper.instance().handleOpenForgotPasswordAlert();
    expect(wrapper.instance().state.openForgotPasswordAlert).toBeTruthy();
  });

  it('calls handleCloseForgotPasswordAlert and sets state', () => {
    wrapper.instance().handleCloseForgotPasswordAlert();
    expect(wrapper.instance().state.openForgotPasswordAlert).toBeFalsy();
  });

  it('calls handlePasswordReset and sets state', () => {
    const data = {
      data: {
        resetPassword: {
          resetLink: "dddd",
          success: ['success'],
        }
      }
    };
    wrapper.setProps({ ResetPassword: jest.fn(() => Promise.resolve(data)) });
    wrapper.setState({ email: 'test@gmail.com' });
    wrapper.instance().handlePasswordReset();
    expect(wrapper.instance().state.EmailError).toBeFalsy();
  });

  it('calls handlePasswordReset and sets state with an error', () => {
    const data = {
      classes: { container: {} },
      data: {
      }
    };
    wrapper.setProps({ ResetPassword: jest.fn(() => Promise.resolve(data)) });
    wrapper.setState({ email: 'test@gmail.com' });
    wrapper.instance().handlePasswordReset();
    expect(wrapper.instance().state.EmailError).toBeFalsy();
  });
});

import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  SIGNUP_MUTATION, EMAIL_LOGIN_MUTATION, MOBILE_LOGIN_MUTATION
} from './mutations/mutations';
import {
  validateEmail, validatePasswordLength, validatePhoneNumber
} from '../../utils/Validation';
import Image from '../../assets/images/doc.png';
import logo from '../../assets/images/logo.png';
import Register from './Register';
import Login from './Login';

const initialState = {
  email: '',
  password: '',
  Code: '',
  phoneNumber: '',
  loading: false,
  checked: false,
  showPassword: false,
  helperPasswordText: '',
  helperEmailText: '',
  passwordError: false,
  EmailError: false,
  helperPhoneText: '',
  PhoneError: false,
  visibileEye: { visibility: 'hidden' },
  openAlert: false,
  errors: '',
  success: null,
  loginSuccess: false,
  loginErrors: false,
  inputType: 'email'
};

export class AuthContainer extends Component {
  state = { ...initialState }

  handleCloseAlert = () => {
    this.setState({ openAlert: false });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCheckbox = (event) => {
    const { checked } = event.target;
    this.setState({ checked });
  }


  handleChangeInput = (event) => {
    const value = event.target.id.split('-')[0];
    this.setState({ inputType: value });
  }

  handleEmailChange = (event) => {
    const { value } = event.target;
    this.setState({ email: value });
    const array = validateEmail(value);
    this.setState({
      helperEmailText: array[0],
      EmailError: array[1]
    });
  }

  handlePhoneChange = (event) => {
    const { value } = event.target;
    this.setState({ phoneNumber: value });
    const array = validatePhoneNumber(value);
    this.setState({
      helperPhoneText: array[0],
      PhoneError: array[1]
    });
  }


  handlePasswordIcon = () => {
    this.setState({
      visibileEye: { visibility: 'visible' },
    });
  };

  handlePasswordChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ password: value });
    const array = validatePasswordLength(value);
    this.setState({
      helperPasswordText: array[0],
      passwordError: array[1]
    });
  };

  handlePasswordVisibility = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { inputType } = this.state;
    let values;
    if (inputType === 'email') {
      values = {
        email: event.target.email.value,
        password: event.target.password.value,
      };
      this.handleEmailLogin(values);
    }
    if (inputType === 'phone') {
      values = {
        password: event.target.password.value,
        mobileNumber: (event.target.Code.value).concat(
          event.target.phoneNumber.value
        )
      };
      this.handleMobileLogin(values);
    }
  }

  handleSignup = () => {
    const { signup } = this.props;
    const {
      email, Code, phoneNumber, password
    } = this.state;
    this.setState({ loading: true });
    signup({
      variables: {
        email,
        mobileNumber: Code.concat(phoneNumber),
        password,
      }
    })
      .then((data) => {
        const { success } = data.data.createUser;
        this.setState({
          loading: false,
          openAlert: true
        });

        if (success[0]) {
          this.setState({
            success,
            email: '',
            password: '',
            Code: '',
            phoneNumber: '',
            helperPasswordText: '',
            helperEmailText: '',
            helperPhoneText: '',
          });
          setTimeout(() => window.location.assign('/login'), 1500);
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errors: err.message.split(':')[1],
          openAlert: true
        });
      });
  }

  handleEmailLogin = (values) => {
    const { Emaillogin } = this.props;
    this.setState({ loading: true });
    Emaillogin({
      variables: values
    })
      .then((data) => {
        this.setState({
          loading: false,
          openAlert: true
        });
        const { token, message } = data.data.loginUser;
        if (message === 'Login Successful') {
          localStorage.setItem('auth_token', token);
          this.setState({
            loginSuccess: true,
            loginErrors: false,
            email: '',
            password: '',
            Code: '',
            phoneNumber: '',
            helperPasswordText: '',
            helperEmailText: '',
            helperPhoneText: '',
          });
          setTimeout(() => window.location.assign('/setup'), 900);
        } else if (message === 'Invalid login credentials') {
          this.setState({
            loginErrors: true,
            loginSuccess: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          loginErrors: true,
          loginSuccess: false,
          openAlert: true,
          loading: false
        });
        console.log(err);
      });
  }

  handleMobileLogin = (values) => {
    const { Mobilelogin } = this.props;
    this.setState({ loading: true });
    Mobilelogin({
      variables: values
    })
      .then((data) => {
        this.setState({
          loading: false,
          openAlert: true
        });
        const { token, message } = data.data.loginUser;
        if (message === 'Login Successful') {
          localStorage.setItem('auth_token', token);
          this.setState({
            loginSuccess: true,
            loginErrors: false
          });
          setTimeout(() => window.location.assign('/setup'), 900);
        } else if (message === 'Invalid login credentials') {
          this.setState({
            loginErrors: true,
            loginSuccess: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          loginErrors: true,
          loginSuccess: false,
          openAlert: true,
          loading: false
        });
        console.log(err);
      });
  }

  render() {
    const { match } = this.props;
    const { path } = match;
    return (
      <div>
        <div className="flex-container">
          <div className="auth-image">
            <div className="auth-bg" />
          </div>
          <div className="auth-form">
            <div className="logo-heading">
              <img className="healthid" src={logo} alt="HealthID" />
              <h4 className="subtext">Africa&apos;s Leading Pharmacy Management Software</h4>
            </div>
            <div className="form-control">
              {path === '/login'
                ? (
                  <Login
                    state={this.state}
                    handlePasswordChange={this.handlePasswordChange}
                    handlePasswordIcon={this.handlePasswordIcon}
                    handlePasswordVisibility={this.handlePasswordVisibility}
                    handleEmailChange={this.handleEmailChange}
                    handleChange={this.handleChange}
                    handlePhoneChange={this.handlePhoneChange}
                    handleCheckbox={this.handleCheckbox}
                    handleSubmit={this.handleSubmit}
                    handleChangeInput={this.handleChangeInput}
                    handleCloseLoginAlert={this.handleCloseAlert}
                  />
                )
                : (
                  <Register
                    state={this.state}
                    handleSignup={this.handleSignup}
                    handleEmailChange={this.handleEmailChange}
                    handlePasswordChange={this.handlePasswordChange}
                    handlePasswordIcon={this.handlePasswordIcon}
                    handlePasswordVisibility={this.handlePasswordVisibility}
                    handlePhoneChange={this.handlePhoneChange}
                    handleChange={this.handleChange}
                    handleCheckbox={this.handleCheckbox}
                    handleCloseSignupAlert={this.handleCloseAlert}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AuthContainer.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signup' }),
  graphql(EMAIL_LOGIN_MUTATION, { name: 'Emaillogin' }),
  graphql(MOBILE_LOGIN_MUTATION, { name: 'Mobilelogin' })
)(AuthContainer);

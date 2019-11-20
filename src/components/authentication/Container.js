/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormHelperText, Grid, Typography, Paper
} from '@material-ui/core';
import {
  SIGNUP_MUTATION, EMAIL_LOGIN_MUTATION, MOBILE_LOGIN_MUTATION,
  RESET_PASSWORD_MUTATION
} from './mutations/mutations';
import {
  validateEmail, validatePasswordLength,
} from '../../utils/authentication/Validation';
import bkglady from '../../assets/images/LoginImage1.png';
import { login } from '../../assets/styles/authentication/authLogin';
import logo from '../../assets/images/logo.png';
import Register from './Register';
import Login from './Login';

import { StateContext } from '../../providers/stateProvider';


export const initialState = {
  email: '',
  password: '',
  phone: '',
  loading: false,
  checked: false,
  showPassword: false,
  helperPasswordText: '',
  helperEmailText: '',
  passwordError: false,
  EmailError: false,
  helperPhoneText: '',
  PhoneError: false,
  openAlert: false,
  openForgotPasswordAlert: false,
  inputType: 'email',
  disabled: false,
  registerErrors: '',
  registerSuccess: null,
  loginSuccess: false,
  loginErrors: '',
};

export class AuthContainer extends Component {
  state = { ...initialState }

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'hideNavbar',
      payload: true
    });
  }

  handleCloseAlert = () => {
    this.setState({
      openAlert: false,
      email: '',
      password: '',
      Code: '',
      phoneNumber: '',
      helperPasswordText: '',
      helperEmailText: '',
      helperPhoneText: '',
      passwordError: false,
      EmailError: false,
      PhoneError: false,
    });
  };

  handleOpenForgotPasswordAlert = () => {
    this.setState({
      openForgotPasswordAlert: true,
      email: '',
      password: '',
      Code: '',
      phoneNumber: '',
      helperPasswordText: '',
      helperEmailText: '',
      helperPhoneText: '',
      passwordError: false,
      EmailError: false,
      PhoneError: false,
    });
  }

  handleCloseForgotPasswordAlert = () => {
    this.setState({
      openForgotPasswordAlert: false,
      email: '',
      EmailError: false,
      helperEmailText: '',
    });
  }

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

  handlePhoneChange = (value) => {
    this.setState({
      phone: value
    });
  }

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
    const { inputType, phone } = this.state;
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
        mobileNumber: phone
      };
      this.handleMobileLogin(values);
    }
  }

  handleSignup = () => {
    const { signup } = this.props;
    const {
      email, phone, password
    } = this.state;
    this.setState({ loading: true });
    signup({
      variables: {
        email,
        mobileNumber: phone,
        password,
      }
    })
      .then((data) => {
        const { success, errors } = data.data.createUser;
        this.setState({
          loading: false,
          openAlert: true
        });

        if (success) {
          this.setState({
            registerSuccess: success,
            password: '',
            helperPasswordText: '',
            helperEmailText: '',
            helperPhoneText: '',
          });
          setTimeout(() => window.location.assign('/'), 1500);
        } else if (errors) {
          this.setState({
            registerErrors: errors[0].split(':')[1]
          });
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
          registerErrors: err.message.split(':')[1],
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
        const { token, message, restToken } = data.data.loginUser;
        const { role, activeOutlet } = data.data.loginUser.user;

        if (message === 'Login Successful') {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('rest_token', restToken);
          this.setState({
            loginSuccess: true,
            loginErrors: '',
            email: '',
            password: '',
            helperPasswordText: '',
            helperEmailText: '',
          });

          if (role.name !== 'Master Admin') {
            setTimeout(() => window.location.assign('/sell'), 900);
          } else if (!activeOutlet) {
            setTimeout(() => window.location.assign('/setup'), 900);
          } else {
            setTimeout(() => window.location.assign('/sell'), 900);
          }
        }
      })
      .catch((err) => {
        this.setState({
          loginErrors: err.message.split(':')[1],
          loginSuccess: false,
          openAlert: true,
          loading: false
        });
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
        const { token, message, restToken } = data.data.loginUser;
        if (message === 'Login Successful') {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('rest_token', restToken);
          this.setState({
            loginSuccess: true,
            loginErrors: '',
            password: '',
            helperPasswordText: '',
            helperPhoneText: '',
          });
          setTimeout(() => window.location.assign('/setup'), 900);
        }
      })
      .catch((err) => {
        this.setState({
          loginErrors: err.message.split(':')[1],
          loginSuccess: false,
          openAlert: true,
          loading: false
        });
      });
  }

  handlePasswordReset = () => {
    const { ResetPassword } = this.props;
    const { email } = this.state;
    this.setState({ loading: true });
    ResetPassword({
      variables: {
        email
      }
    })
      .then((data) => {
        const { resetLink, success } = data.data.resetPassword;
        localStorage.setItem('reset-link', resetLink);
        this.setState({
          loading: false,
          EmailError: false,
          helperEmailText: (
            <FormHelperText className="valid">
              {success}
            </FormHelperText>
          )
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          EmailError: true,
          helperEmailText: (
            <FormHelperText className="error">
              {err.message.split(':')[1]}
            </FormHelperText>)
        });
      });
  }

  static contextType = StateContext;

  render() {
    const { classes } = this.props;
    const {
      match: { path }
    } = this.props;

    return (
      <Grid container className={classes.container}>
        <img alt="" src={bkglady} className={classes.bkgImage} />
        <Grid item container className={classes.wrapperGrid}>
          <Grid item container xs={5} className={classes.logo}>
            <img className="healthid" src={logo} alt="HealthID" />
            <Typography variant="h5" className={classes.logoTypo}>
              The heartbeat of smart pharmacies.
            </Typography>
          </Grid>
          <Grid item xs={7} className={classes.contentGrid}>
            <Paper className={classes.contentPaper}>
              {path === '/register'
                ? (
                  <Register
                    state={this.state}
                    handleSignup={this.handleSignup}
                    handleEmailChange={this.handleEmailChange}
                    handlePasswordChange={this.handlePasswordChange}
                    handlePasswordVisibility={this.handlePasswordVisibility}
                    handlePhoneChange={this.handlePhoneChange}
                    handleCheckbox={this.handleCheckbox}
                    handleCloseSignupAlert={this.handleCloseAlert}
                  />
                )
                : (
                  <Login
                    state={this.state}
                    handlePasswordChange={this.handlePasswordChange}
                    handlePasswordVisibility={this.handlePasswordVisibility}
                    switchAccount={false}
                    handleEmailChange={this.handleEmailChange}
                    handlePhoneChange={this.handlePhoneChange}
                    handleCheckbox={this.handleCheckbox}
                    handleSubmit={this.handleSubmit}
                    handleChangeInput={this.handleChangeInput}
                    handleCloseLoginAlert={this.handleCloseAlert}
                    handlePasswordReset={this.handlePasswordReset}
                    handleOpenForgotPasswordAlert={this.handleOpenForgotPasswordAlert}
                    handleCloseForgotPasswordAlert={this.handleCloseForgotPasswordAlert}
                  />
                )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

AuthContainer.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  ResetPassword: PropTypes.func.isRequired,
  Mobilelogin: PropTypes.func.isRequired,
  Emaillogin: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired
};

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signup' }),
  graphql(EMAIL_LOGIN_MUTATION, { name: 'Emaillogin' }),
  graphql(MOBILE_LOGIN_MUTATION, { name: 'Mobilelogin' }),
  graphql(RESET_PASSWORD_MUTATION, { name: 'ResetPassword' })
)(withStyles(login)(AuthContainer));

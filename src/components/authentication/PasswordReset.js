import React, { Component } from 'react';
import axios from 'axios';
import {
  Input, InputLabel, FormControl, FormHelperText, IconButton, CircularProgress
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import logo from '../../assets/images/logo.png';
import {
  validatePasswordLength, confirmPasswords,
} from '../../utils/authentication/Validation';
import '../../assets/styles/authentication/PasswordReset.scss';


class ResetPassword extends Component {
  state = {
    newPassword: '',
    confirmedPassword: '',
    serverResponse: '',
    helperNewPasswordText: '',
    helperConfirmedPasswordText: '',
    passwordError: false,
    showPassword: false,
    loading: false,
    disableField: true
  }

  handlePasswordChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const array = validatePasswordLength(value);
    this.setState({
      helperNewPasswordText: array[0],
      passwordError: array[1],
      disableField: false
    });
    setTimeout(() => {
      this.setState({
        helperConfirmedPasswordText: '',
        helperNewPasswordText: '',
        disableField: false
      });
    }, 500);
  };

  handleConfirmPassword = (event) => {
    event.preventDefault();
    const { newPassword } = this.state;
    if (newPassword === '') {
      this.setState({
        passwordError: true,
        helperNewPasswordText: (
          <FormHelperText className="error">
            Please fill in this field first
          </FormHelperText>
        ),
        disableField: true
      });
    } else {
      this.setState({
        passwordError: false,
        helperNewPasswordText: '',
        disableField: false
      });
      const { name, value } = event.target;
      this.setState({ [name]: value });
      const array = confirmPasswords(newPassword, value);
      this.setState({
        helperConfirmedPasswordText: array[0],
        passwordError: array[1],
        helperNewPasswordText: '',
        disableField: false
      });
      setTimeout(() => {
        this.setState({
          helperConfirmedPasswordText: '',
          helperNewPasswordText: '',
          disableField: false
        });
      }, 500);
    }
  }

  handlePasswordVisibility = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { newPassword } = this.state;
    this.setState({
      loading: true
    });

    let url = window.location.href;
    url = url.split('/');
    const uidb64 = url[4];
    const token = url[5];

    const resetUrl = `${process.env.APP_LINK}${uidb64}/${token}`;

    const user = {
      password: newPassword
    };

    axios.put(resetUrl, { user })
      .then((res) => {
        this.setState({
          loading: false
        });
        if (res.data.message === 'Your password was successfully reset.') {
          this.setState({
            helperNewPasswordText: '',
            helperConfirmedPasswordText: '',
            serverResponse: (
              <FormHelperText className="server-response valid">
              Your password was successfully reset
              </FormHelperText>
            )
          });
          setTimeout(() => window.location.assign('/login'), 1500);
        }
      })
      .catch((error) => {
        this.setState({
          helperNewPasswordText: '',
          helperConfirmedPasswordText: '',
          loading: false,
          serverResponse: (
            <FormHelperText className="server-response error">
              There was a problem resetting your password. Please try again.
            </FormHelperText>
          )
        });
        return error;
      });
  };

  render() {
    const {
      newPassword, confirmedPassword, passwordError, showPassword,
      helperNewPasswordText, helperConfirmedPasswordText, loading,
      serverResponse, disableField
    } = this.state;

    const type = showPassword ? 'text' : 'password';
    const passwordIcon = showPassword ? <Visibility /> : <VisibilityOff />;

    const match = newPassword === confirmedPassword;

    const emptyField = !newPassword || !confirmedPassword;
    const disableButton = passwordError || emptyField || !match;

    const showButton = loading ? { display: 'none' } : { display: 'block' };

    const matchError = !emptyField && !match;


    return (
      <div className="reset-container">
        <div className="page-logo">
          <img src={logo} alt="HEALTHID" className="logo-img" />
        </div>
        <div className="reset-heading">
          <h1 className="reset-password">Reset Your Password</h1>
        </div>
        <div className="reset-form">
          <form onSubmit={this.handleSubmit}>
            <div className="reset-fields">
              <FormControl
                error={newPassword ? passwordError : false}
                className="password-field"
                required
              >
                <InputLabel htmlFor="adornment-newPassword">New Password</InputLabel>
                <Input
                  id="adornment-newPassword"
                  name="newPassword"
                  className="password-field1"
                  type={type}
                  onChange={this.handlePasswordChange}
                  endAdornment={(
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handlePasswordVisibility}
                      className="password-icon"
                    >
                      {passwordIcon}
                    </IconButton>
                  )}
                />
                {helperNewPasswordText}
                {matchError ? (
                  <FormHelperText className="error">
                  Passwords do not match
                  </FormHelperText>
                ) : ''}
              </FormControl>
              <FormControl
                error={confirmedPassword ? passwordError : false}
                className="password-field"
                required
                disabled={disableField}
              >
                <InputLabel htmlFor="adornment-confirmedPassword">Confirm New Password</InputLabel>
                <Input
                  id="adornment-confirmedPassword"
                  name="confirmedPassword"
                  className="password-field2"
                  type={type}
                  onChange={this.handleConfirmPassword}
                  endAdornment={(
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handlePasswordVisibility}
                      className="password-icon"
                    >
                      {passwordIcon}
                    </IconButton>
                  )}
                />
                {helperConfirmedPasswordText}
              </FormControl>
            </div>
            <div className="reset-button">
              <div className="server-render">{serverResponse}</div>
              {loading ? <CircularProgress color="primary" className="loader" /> : ''}
              {disableButton
                ? (
                  <button type="submit" disabled className="disabled-reset">RESET</button>
                ) : (
                  <button type="submit" style={showButton} className="reset">RESET</button>
                )
              }
            </div>
          </form>
          <div className="reset-link">
            <a href="/login" className="login-link">Back to login</a>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;

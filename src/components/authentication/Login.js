import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TextField, Grid, CircularProgress, FormControl
} from '@material-ui/core';

import LoginAlert from './Alerts/LoginAlert';
import ForgotPasswordAlert from './Alerts/ForgotPasswordAlert';
import '../../assets/styles/authentication/Login.scss';
import PasswordField from './Inputs/PasswordField';
import SelectCountry from './Inputs/SelectCountryCode';

class Login extends Component {
  renderInputFields = (type) => {
    const {
      state: { EmailError, email, helperEmailText },
      handleEmailChange
    } = this.props;
    const phoneLabelNum = type === 'phone' ? 'Phone #' : null;
    const emailLabel = type === 'email' ? 'Email' : null;
    return (
      <div>
        {type === 'email' ? (
          <FormControl className="login-email-field">
            <TextField
              label={emailLabel}
              name={type}
              required
              error={EmailError}
              value={email}
              onChange={handleEmailChange}
            />
            {helperEmailText}
          </FormControl>
        ) : (
          this.renderPhoneInputs(phoneLabelNum)
        )}
      </div>
    );
  };

  renderPhoneInputs = (phoneLabelNum) => {
    const {
      state: { phone },
      handlePhoneChange
    } = this.props;
    return (
      <div>
        <Grid container spacing={16} className="login-phone-grid">
          <SelectCountry phone={phone} onChange={handlePhoneChange} label={phoneLabelNum} />
        </Grid>
      </div>
    );
  };

  render() {
    const {
      state: {
        email,
        password,
        loading,
        showPassword,
        checked,
        inputType,
        openAlert,
        loginSuccess,
        loginErrors,
        EmailError,
        openForgotPasswordAlert,
        disabled,
        helperEmailText
      },
      handlePasswordChange,
      handlePasswordVisibility,
      handleSubmit,
      handleChangeInput,
      handleCloseLoginAlert,
      handleCheckbox,
      handleEmailChange,
      handleCloseForgotPasswordAlert,
      switchAccount,
      handleOpenForgotPasswordAlert,
      handlePasswordReset
    } = this.props;

    const hidden = loading ? { display: 'none' } : { display: 'block' };

    const activeEmail = inputType === 'email' ? '--active' : '';
    const activePhone = inputType === 'phone' ? '--active' : '';
    const loginLabel = !switchAccount ? 'LOGIN' : 'SWITCH ACCOUNT';
    const emailClass = !switchAccount ? `email-label${activeEmail}` : `switch-email-label${activeEmail}`;
    const phoneClass = !switchAccount ? `phone-label${activePhone}` : `switch-phone-label${activePhone}`;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="top-level">
              <div className={!switchAccount ? 'login-label' : 'login-switch'}>
                {!switchAccount ? 'Login with:' : 'Switch with:'}
              </div>
              <div
                id="email-type"
                role="button"
                tabIndex="0"
                onClick={handleChangeInput}
                onKeyDown={handleChangeInput}
                className={emailClass}
              >
                Email
              </div>
              <div className={!switchAccount ? 'separator' : 'separator-switch'} />
              <div
                id="phone-type"
                role="button"
                tabIndex="-1"
                onClick={handleChangeInput}
                onKeyDown={handleChangeInput}
                className={phoneClass}
              >
                Phone Number
              </div>
            </div>
            <div>
              <div className="input-fields">{this.renderInputFields(inputType)}</div>
            </div>
          </div>
          <PasswordField
            showPassword={showPassword}
            password={password}
            handlePasswordChange={handlePasswordChange}
            handlePasswordVisibility={handlePasswordVisibility}
          />
          {!switchAccount && (
            <div className="form-checks">
              <div className="check-login">
                <label className="check-container">
                  <small className="small-text">Remember me</small>
                  <input
                    type="checkbox"
                    checked={checked}
                    name="checked"
                    onChange={handleCheckbox}
                  />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="reset-password">
                <button
                  type="button"
                  className="password-link"
                  onClick={handleOpenForgotPasswordAlert}
                >
                  Forgot password?
                </button>
              </div>
            </div>
          )}
          {!switchAccount && (
            <ForgotPasswordAlert
              open={openForgotPasswordAlert}
              EmailError={EmailError}
              handlePasswordReset={handlePasswordReset}
              handleEmailChange={handleEmailChange}
              onClose={handleCloseForgotPasswordAlert}
              loading={loading}
              disabled={disabled}
              helperEmailText={helperEmailText}
            />
          )}
          {loading ? <CircularProgress color="primary" className="loader" /> : ''}
          {EmailError ? (
            <button
              className={!switchAccount ? 'disabled-register' : 'disabled-login'}
              type="button"
              disabled
            >
              {loginLabel}
            </button>
          ) : (
            <button
              className={!switchAccount ? 'register-btn' : 'login-btn'}
              type="submit"
              style={hidden}
            >
              {loginLabel}
            </button>
          )}
          <LoginAlert
            open={openAlert}
            onClose={handleCloseLoginAlert}
            success={loginSuccess}
            email={email}
            errors={loginErrors}
          />
          {!switchAccount && (
            <p className="login-qn">
              Don&apos;t have an account?&nbsp;
              {' '}
              <Link to="/" className="login-link">
                SIGNUP
              </Link>
            </p>
          )}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  switchAccount: PropTypes.bool.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handlePasswordVisibility: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handleCloseLoginAlert: PropTypes.func,
  handleCheckbox: PropTypes.func.isRequired,
  handlePhoneChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handlePasswordReset: PropTypes.func,
  handleCloseForgotPasswordAlert: PropTypes.func,
  handleOpenForgotPasswordAlert: PropTypes.func
};

Login.defaultProps = {
  handlePasswordReset: () => {},
  handleCloseLoginAlert: () => {},
  handleCloseForgotPasswordAlert: () => {},
  handleOpenForgotPasswordAlert: () => {}
};

export default Login;

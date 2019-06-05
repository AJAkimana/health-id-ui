import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TextField, Checkbox, Grid, CircularProgress, FormControl
} from '@material-ui/core';
import LoginAlert from './Alerts/LoginAlert';
import ForgotPasswordAlert from './Alerts/ForgotPasswordAlert';
import '../../assets/styles/authentication/Login.scss';
import PasswordField from './Inputs/PasswordField';
import SelectCountry from './Inputs/SelectCountryCode';


class Login extends Component {
  renderInputFields = (type) => {
    const {
      state: {
        EmailError, email, helperEmailText
      },
      handleEmailChange,
    } = this.props;
    const phoneLabelNum = type === 'phone' ? 'Phone #' : null;
    const emailLabel = type === 'email' ? 'Email' : null;
    return (
      <div>
        {type === 'email' ? (
          <FormControl
            className="login-email-field"
          >
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
        ) : this.renderPhoneInputs(phoneLabelNum)}
      </div>
    );
  }

  renderPhoneInputs = (phoneLabelNum) => {
    const {
      state: {
        phoneNumber, Code, PhoneError, helperPhoneText
      },
      handleChange, handlePhoneChange,
    } = this.props;
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={2}>
            <SelectCountry
              Code={Code}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label={phoneLabelNum}
              name="phoneNumber"
              fullWidth
              required
              value={phoneNumber}
              error={PhoneError}
              onChange={handlePhoneChange}
            />
            {helperPhoneText}
          </Grid>
        </Grid>
      </div>
    );
  }


  render() {
    const {
      state: {
        email, password, loading, showPassword, helperPasswordText, passwordError,
        checked, inputType, openAlert, loginSuccess, loginErrors,
        PhoneError, EmailError, openForgotPasswordAlert, disabled, helperEmailText
      },
      handlePasswordChange, handlePasswordVisibility, handleSubmit,
      handleChangeInput, handleCloseLoginAlert, handleCheckbox, handleEmailChange,
      handleCloseForgotPasswordAlert,
      handleOpenForgotPasswordAlert, handlePasswordReset
    } = this.props;

    const hidden = loading ? { display: 'none' } : { display: 'block' };
    const formError = passwordError || EmailError || PhoneError;

    const activeEmail = inputType === 'email' ? '--active' : '';
    const activePhone = inputType === 'phone' ? '--active' : '';
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="top-level">
              <div className="login-label">Login with:</div>
              <div id="email-type" role="button" onClick={handleChangeInput} onFocus={() => {}} className={`email-label${activeEmail}`}>Email</div>
              <div className="separator" />
              <div id="phone-type" role="button" onClick={handleChangeInput} onFocus={() => {}} className={`phone-label${activePhone}`}>Phone Number</div>
            </div>
            <div>
              <div className="input-fields">
                {this.renderInputFields(inputType)}
              </div>
            </div>
          </div>
          <PasswordField
            showPassword={showPassword}
            error={passwordError}
            password={password}
            handlePasswordChange={handlePasswordChange}
            handlePasswordVisibility={handlePasswordVisibility}
            helperPasswordText={helperPasswordText}
          />
          <div className="form-checks">
            <div className="check-login">
              <Checkbox
                checked={checked}
                onChange={handleCheckbox}
                className="checkbox"
                value="checked"
                color="primary"
              />
              &nbsp;&nbsp;
              <small className="small-text">Remember me</small>
            </div>
            <div className="reset-password">
              <button type="button" className="password-link" onClick={handleOpenForgotPasswordAlert}>Forgot password?</button>
            </div>
          </div>
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
          {loading ? <CircularProgress color="primary" className="loader" /> : ''}
          {formError
            ? (
              <button className="disabled-register" type="button" disabled>LOGIN</button>
            )
            : (
              <button className="register-btn" type="submit" style={hidden}>LOGIN</button>
            )}
          <LoginAlert
            open={openAlert}
            onClose={handleCloseLoginAlert}
            success={loginSuccess}
            email={email}
            errors={loginErrors}
          />
          <p className="login-qn">
            Don&apos;t have an account?&nbsp;
            {' '}
            <Link to="/" className="login-link">SIGNUP</Link>
          </p>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  handleChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handlePasswordVisibility: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handleCloseLoginAlert: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handlePhoneChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handlePasswordReset: PropTypes.func.isRequired,
  handleCloseForgotPasswordAlert: PropTypes.func.isRequired,
  handleOpenForgotPasswordAlert: PropTypes.func.isRequired,
};


export default Login;

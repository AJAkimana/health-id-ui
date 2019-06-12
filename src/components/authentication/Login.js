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
      state: { phone }, handlePhoneChange,
    } = this.props;
    return (
      <div>
        <Grid container spacing={16} className="login-phone-grid">
          <SelectCountry
            phone={phone}
            onChange={handlePhoneChange}
            label={phoneLabelNum}
          />
        </Grid>
      </div>
    );
  }


  render() {
    const {
      state: {
        email, password, loading, showPassword,
        checked, inputType, openAlert, loginSuccess, loginErrors,
        EmailError, openForgotPasswordAlert, disabled, helperEmailText
      },
      handlePasswordChange, handlePasswordVisibility, handleSubmit,
      handleChangeInput, handleCloseLoginAlert, handleCheckbox, handleEmailChange,
      handleCloseForgotPasswordAlert,
      handleOpenForgotPasswordAlert, handlePasswordReset
    } = this.props;

    const hidden = loading ? { display: 'none' } : { display: 'block' };

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
            password={password}
            handlePasswordChange={handlePasswordChange}
            handlePasswordVisibility={handlePasswordVisibility}
          />
          <div className="form-checks">
            <div className="check-login">
              <label className="check-container">
                <small className="small-text">Remember me</small>
                <input type="checkbox" checked={checked} name="checked" onChange={handleCheckbox} />
                <span className="checkmark" />
              </label>
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
          {EmailError
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
  handlePasswordChange: PropTypes.func,
  handlePasswordVisibility: PropTypes.func,
  handleEmailChange: PropTypes.func,
  handleCloseLoginAlert: PropTypes.func,
  handleCheckbox: PropTypes.func,
  handlePhoneChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChangeInput: PropTypes.func,
  handlePasswordReset: PropTypes.func,
  handleCloseForgotPasswordAlert: PropTypes.func,
  handleOpenForgotPasswordAlert: PropTypes.func,
};


export default Login;

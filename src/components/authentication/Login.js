import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TextField, Checkbox, Grid, CircularProgress, FormControl
} from '@material-ui/core';
import LoginAlert from './Alerts/LoginAlert';
import '../../assets/styles/authentication/Login.scss';
import PasswordField from './Inputs/PasswordField';
import SelectCountry from './Inputs/SelectCountryCode';


class Login extends Component {
  renderInputFields = (type) => {
    const {
      state: {
        EmailError, email, helperEmailText
      },
      handleEmailChange
    } = this.props;
    const phoneLabelNum = type === 'phone' ? 'Phone #' : null;
    const emailLabel = type === 'email' ? 'Email' : null;
    return (
      <div>
        {type === 'email' ? (
          <FormControl
            style={{ marginBottom: '25px' }}
            className="textfield"
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
      handleChange, handlePhoneChange
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
              className="textfield"
              label={phoneLabelNum}
              name="phoneNumber"
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
        visibileEye, checked, inputType, openAlert, loginSuccess, loginErrors,
        PhoneError, EmailError
      },
      handlePasswordChange, handlePasswordIcon, handlePasswordVisibility, handleSubmit,
      handleChangeInput, handleCloseLoginAlert, handleCheckbox
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
            handlePasswordIcon={handlePasswordIcon}
            handlePasswordVisibility={handlePasswordVisibility}
            visibileEye={visibileEye}
            helperPasswordText={helperPasswordText}
          />
          <div className="form-checks">
            <div className="check-login">
              <Checkbox
                checked={checked}
                onChange={handleCheckbox}
                style={{ padding: '0' }}
                value="checked"
                color="primary"
              />
              &nbsp;&nbsp;
              <small className="small-text">Remember me</small>
            </div>
            <div className="reset-password">
              <button type="button" className="password-link">Forgot password?</button>
            </div>
          </div>
          {loading ? <CircularProgress color="primary" style={{ display: 'block', margin: '0 auto' }} /> : ''}
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
  helperEmailText: PropTypes.string,
  EmailError: PropTypes.bool,
  email: PropTypes.string,
  helperPhoneText: PropTypes.string,
  PhoneError: PropTypes.bool,
  phoneNumber: PropTypes.string,
  Code: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handlePasswordIcon: PropTypes.func.isRequired,
  handlePasswordVisibility: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handleCloseLoginAlert: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handlePhoneChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired
};

Login.defaultProps = {
  helperEmailText: '',
  EmailError: false,
  email: '',
  helperPhoneText: '',
  PhoneError: false,
  phoneNumber: '',
  Code: ''
};

export default Login;

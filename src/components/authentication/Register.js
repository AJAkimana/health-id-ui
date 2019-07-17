import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TextField, Grid, CircularProgress,
} from '@material-ui/core';
import RegisterAlert from './Alerts/RegisterAlert';
import PasswordField from './Inputs/PasswordField';
import SelectCountry from './Inputs/SelectCountryCode';


const Register = (props) => {
  const {
    state: {
      password, email, loading, showPassword, helperPasswordText,
      helperEmailText, passwordError, EmailError, PhoneError, openAlert,
      checked, registerSuccess, registerErrors, phone
    },
    handlePasswordChange, handlePasswordVisibility,
    handleEmailChange, handleCloseSignupAlert, handleCheckbox,
    handlePhoneChange, handleSignup,
  } = props;

  const hidden = loading ? { display: 'none' } : { display: 'block' };

  const formError = passwordError || EmailError || PhoneError;

  const emptyField = (!email || !phone || !password);

  const buttonCondition = emptyField || formError;

  return (
    <div>
      <TextField
        className="textfield"
        required
        error={email ? EmailError : false}
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />
      {email && EmailError ? helperEmailText : ''}
      <Grid container spacing={16} className="grid-container">
        <SelectCountry
          phone={phone}
          onChange={handlePhoneChange}
        />
      </Grid>
      <div>
        <PasswordField
          showPassword={showPassword}
          error={passwordError}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handlePasswordVisibility={handlePasswordVisibility}
          helperPasswordText={helperPasswordText}
        />
        <div>
          <label className="check-container">
            <small className="small-text">
    By signing up, you agree to our&nbsp;
              {' '}
              <a href="/terms-of-service" className="small-anchor">Terms of Service</a>
              {' '}
                &nbsp;and&nbsp;
              {' '}
              <a href="/privacy-policy" className="small-anchor">Privacy Policy</a>
    .
            </small>
            <input type="checkbox" checked={checked} name="checked" onChange={handleCheckbox} />
            <span className="checkmark" />
          </label>
        </div>
      </div>
      <div className="bottom-section">
        {loading ? <CircularProgress className="loader" color="primary" /> : ''}
        {!buttonCondition && checked
          ? <button className="register-btn" type="button" style={hidden} onClick={handleSignup}>REGISTER</button>
          : <button className="disabled-register" type="button" disabled value="REGISTER">REGISTER</button>}
        <RegisterAlert
          open={openAlert}
          onClose={handleCloseSignupAlert}
          success={registerSuccess}
          email={email}
          registerErrors={registerErrors}
        />
      </div>
      <p className="login-qn">
              Already have an account?
        {' '}
        <Link to="/" className="login-link">LOGIN</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handlePasswordVisibility: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handleCloseSignupAlert: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handlePhoneChange: PropTypes.func.isRequired,
  handleSignup: PropTypes.func.isRequired
};

export default Register;

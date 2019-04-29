import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TextField, Checkbox, Grid, CircularProgress,
} from '@material-ui/core';
import RegisterAlert from './Alerts/RegisterAlert';
import PasswordField from './Inputs/PasswordField';
import SelectCountry from './Inputs/SelectCountryCode';


const Register = (props) => {
  const {
    state: {
      password, email, loading, showPassword, helperPasswordText, helperEmailText, passwordError,
      EmailError, visibileEye, Code, PhoneError, phoneNumber, helperPhoneText, openAlert,
      errors, success, checked
    },
    handlePasswordChange, handlePasswordIcon, handlePasswordVisibility,
    handleEmailChange, handleChange, handleCloseSignupAlert, handleCheckbox,
    handlePhoneChange, handleSignup
  } = props;

  const hidden = loading ? { display: 'none' } : { display: 'block' };

  const formError = passwordError || EmailError || PhoneError;
  const emptyField = (!email || !phoneNumber || !password);
  const buttonCondition = emptyField || formError;

  console.log(emptyField);
  return (
    <div>
      <TextField
        className="textfield"
        required
        error={EmailError}
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />
      {helperEmailText}
      <Grid container spacing={16} style={{ marginTop: '25px' }}>
        <Grid item xs={2}>
          <SelectCountry
            Code={Code}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            className="textfield"
            label="Phone #"
            name="phoneNumber"
            required
            error={PhoneError}
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
          {helperPhoneText}
        </Grid>
      </Grid>
      <div
        style={{ marginBottom: '25px' }}
      >
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
        <div>
          <Checkbox
            checked={checked}
            onChange={handleCheckbox}
            style={{ padding: '0' }}
            name="checked"
            color="primary"
          />
          {' '}
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
        </div>
      </div>
      <div>
        {loading ? <CircularProgress color="primary" style={{ display: 'block', margin: '0 auto' }} /> : ''}
        {!buttonCondition && checked
          ? <button className="register-btn" type="button" style={hidden} onClick={handleSignup}>REGISTER</button>
          : <button className="disabled-register" type="button" disabled value="REGISTER">REGISTER</button>}
        <RegisterAlert
          open={openAlert}
          onClose={handleCloseSignupAlert}
          success={success}
          email={email}
          errors={errors}
        />
      </div>
      <p className="login-qn">
              Already have an account?
        {' '}
        <Link to="/login" className="login-link">LOGIN</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  handleChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handlePasswordIcon: PropTypes.func.isRequired,
  handlePasswordVisibility: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handleCloseSignupAlert: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handlePhoneChange: PropTypes.func.isRequired,
  handleSignup: PropTypes.func.isRequired
};

export default Register;

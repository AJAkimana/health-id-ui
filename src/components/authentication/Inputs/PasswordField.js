import React from 'react';
import PropTypes from 'prop-types';
import {
  InputLabel, FormControl, Input, IconButton
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const PasswordField = (props) => {
  const {
    showPassword, password, handlePasswordChange,
    error, helperPasswordText, handlePasswordVisibility,
  } = props;

  const type = showPassword ? 'text' : 'password';
  const passwordIcon = showPassword ? <Visibility /> : <VisibilityOff />;

  return (
    <FormControl
      error={error}
      style={{ paddingBottom: '25px' }}
      className="textfield"
    >
      <InputLabel htmlFor="adornment-password">Password</InputLabel>
      <Input
        id="adornment-password"
        name="password"
        required
        type={type}
        value={password}
        onChange={handlePasswordChange}
        endAdornment={(
          <IconButton
            aria-label="Toggle password visibility"
            onClick={handlePasswordVisibility}
            className="password-icon"
          >
            {passwordIcon}
          </IconButton>
        )}
      />
      {helperPasswordText}
    </FormControl>
  );
};

PasswordField.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  password: PropTypes.string,
  helperPasswordText: PropTypes.string,
  handlePasswordChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  handlePasswordVisibility: PropTypes.func.isRequired,
};

PasswordField.defaultProps = {
  password: '',
  helperPasswordText: ''
};

export default PasswordField;

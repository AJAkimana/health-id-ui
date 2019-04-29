import React from 'react';
import PropTypes from 'prop-types';
import {
  InputLabel, InputAdornment, FormControl, Input, IconButton
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const PasswordField = (props) => {
  const {
    showPassword, password, handlePasswordIcon, handlePasswordChange,
    error, helperPasswordText, visibileEye, handlePasswordVisibility,
  } = props;

  const type = showPassword ? 'text' : 'password';
  const passwordIcon = showPassword ? <Visibility /> : <VisibilityOff />;

  return (
    <FormControl
      error={error}
      style={{ paddingBottom: '25px' }}
    >
      <InputLabel htmlFor="adornment-password">Password</InputLabel>
      <Input
        id="adornment-password"
        name="password"
        required
        type={type}
        value={password}
        onClick={handlePasswordIcon}
        onChange={handlePasswordChange}
        endAdornment={(
          <InputAdornment position="end" style={visibileEye}>
            <IconButton
              aria-label="Toggle password visibility"
              onClick={handlePasswordVisibility}
              style={{ color: '#A3A3A3' }}
            >
              {passwordIcon}
            </IconButton>
          </InputAdornment>
        )}
      />
      {helperPasswordText}
    </FormControl>
  );
};

PasswordField.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  password: PropTypes.string,
  handlePasswordIcon: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  visibileEye: PropTypes.instanceOf(Object).isRequired,
  handlePasswordVisibility: PropTypes.func.isRequired,
};

PasswordField.defaultProps = {
  password: '',
};

export default PasswordField;

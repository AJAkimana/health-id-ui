import React from 'react';
import { FormHelperText } from '@material-ui/core';

export const validatePasswordLength = (password) => {
  let helperText = '';
  let error = false;
  const regex = /(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])/;
  if (password.length < 8) {
    helperText = (
      <FormHelperText className="error">
        Too short!
      </FormHelperText>
    );
    error = true;
  } else if (!regex.test(password)) {
    helperText = (
      <FormHelperText className="error">
        should contain at least an UPPERCASE, lowercase letter and number
      </FormHelperText>
    );
    error = true;
  } else {
    helperText = (
      <FormHelperText className="valid">
        Valid password
      </FormHelperText>
    );
    error = false;
  }
  return [helperText, error];
};

export const validateEmail = (email) => {
  let helperText;
  let error = false;
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regextTest = regex.test(email);
  if (regextTest) {
    helperText = (
      <FormHelperText className="valid">
        Valid email
      </FormHelperText>
    );
    error = false;
  } else {
    helperText = (
      <FormHelperText className="error">
        Invalid Email
      </FormHelperText>
    );
    error = true;
  }
  return [helperText, error];
};


export const validatePhoneNumber = (phone) => {
  let helperText;
  let error;
  const regex = /^\d{9,11}$/;
  const regextTest = regex.test(phone);
  if (regextTest) {
    helperText = (
      <FormHelperText className="valid">
        Valid Number
      </FormHelperText>
    );
    error = false;
  } else {
    helperText = (
      <FormHelperText className="error">
        Invalid Number
      </FormHelperText>
    );
    error = true;
  }
  return [helperText, error];
};

export const confirmPasswords = (value1, value2) => {
  let helperText;
  let error;
  if (value1 === value2) {
    helperText = (
      <FormHelperText className="valid">
        Passwords match
      </FormHelperText>
    );
    error = false;
  } else {
    helperText = (
      <FormHelperText className="error">
        Passwords did not match
      </FormHelperText>
    );
    error = true;
  }
  return [helperText, error];
};

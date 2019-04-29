import React from 'react';
import { FormHelperText } from '@material-ui/core';

export const validatePasswordLength = (password) => {
  let helperText = '';
  let error = false;
  const regex = /(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])/;
  if (password.length < 8) {
    helperText = (
      <FormHelperText style={{ color: '#FF4141' }}>
        Too short!
      </FormHelperText>
    );
    error = true;
  } else if (!regex.test(password)) {
    helperText = (
      <FormHelperText style={{ color: '#FF4141' }}>
        should contain at least an UPPERCASE, lowercase letter and number
      </FormHelperText>
    );
    error = true;
  } else {
    helperText = (
      <FormHelperText style={{ color: '#FAF33E' }}>
        Done!
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
      <FormHelperText style={{ color: '#FAF33E' }}>
        Valid email
      </FormHelperText>
    );
    error = false;
  } else {
    helperText = (
      <FormHelperText style={{ color: '#FF4141' }}>
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
      <FormHelperText style={{ color: '#FAF33E' }}>
        Valid Number
      </FormHelperText>
    );
    error = false;
  } else {
    helperText = (
      <FormHelperText style={{ color: '#FF4141' }}>
        Invalid Number
      </FormHelperText>
    );
    error = true;
  }
  return [helperText, error];
};

import { isValidPhoneNumber } from 'react-phone-number-input';

let helperText;
let error;
export const validateEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const regxTest = regex.test(email);
  if (regxTest) {
    helperText = '';
    error = false;
  } else {
    helperText = 'Invalid Email';
    error = true;
  }
  return [helperText, error];
};

export const validatePhone = (phone) => {
  const validPhone = isValidPhoneNumber(phone);
  if (validPhone) {
    helperText = '';
    error = false;
  } else {
    helperText = 'Invalid Phone Number';
    error = true;
  }
  return [helperText, error];
};

export const validateName = (str) => {
  const regex = /^(?=.{5,15}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
  const regxTest = regex.test(str);
  if (regxTest) {
    helperText = '';
    error = false;
  } else {
    helperText = 'Enter atleast 5 to 15 letters only';
    error = true;
  }
  return [helperText, error];
};
export const validateComment = (str) => {
  const regex = /^(?=.{10,30}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
  const regxTest = regex.test(str);
  if (regxTest) {
    helperText = '';
    error = false;
  } else {
    helperText = 'Enter a maximum of 100 characters';
    error = true;
  }
  return [helperText, error];
};

export const validateInterger = (str) => {
  const regex = /^\+?[1-9]\d*$/;
  return regex.test(str);
};

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
  const regex = /^\d{12,12}$/;
  const regxTest = regex.test(phone);
  if (regxTest) {
    helperText = '';
    error = false;
  } else {
    helperText = 'Invalid Number';
    error = true;
  }
  return [helperText, error];
};

export const validateName = (str) => {
  const regex = /^(?=.{3,15}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
  const regxTest = regex.test(str);
  if (regxTest) {
    helperText = '';
    error = false;
  } else {
    helperText = 'Enter atleast 3 to 15 letters only';
    error = true;
  }
  return [helperText, error];
};

export const validateInterger = (str) => {
  const regex = /^\+?[1-9]\d*$/;
  return regex.test(str);
};

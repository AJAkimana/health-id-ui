import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactPhoneInput from 'react-phone-input-mui';
import { TextField } from '@material-ui/core';

const PhoneField = (props) => {
  const { value, onChange, isSelected } = props;

  const preferredCountries = ['ng', 'gh', 'gb'];

  return (
    <Fragment>
      <ReactPhoneInput
        disableAreaCodes
        disableCountryCode={isSelected && value}
        value={value}
        placeholder=""
        preferredCountries={preferredCountries}
        label="Phone"
        defaultCountry="ng"
        onChange={onChange}
        containerStyle={{
          width: '100%',
        }}
        inputStyle={{
          margin: 0
        }}
        component={TextField}
        inputExtraProps={{
          margin: 'normal',
          required: true,
          name: 'phone'
        }}
      />
    </Fragment>
  );
};

PhoneField.propTypes = {
  isSelected: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

PhoneField.defaultProps = {
  value: '',
  isSelected: false
};

export default PhoneField;

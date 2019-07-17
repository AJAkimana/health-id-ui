import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactPhoneInput from 'react-phone-input-mui';
import { TextField } from '@material-ui/core';

const SelectCountry = (props) => {
  const { phone, onChange } = props;

  const preferredCountries = ['ng', 'gh', 'gb'];

  return (
    <Fragment>
      <ReactPhoneInput
        disableAreaCodes
        value={phone}
        placeholder=""
        preferredCountries={preferredCountries}
        label="Phone"
        defaultCountry="ng"
        onChange={onChange}
        containerStyle={{
          width: '100%',
          marginBottom: '17px',
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

SelectCountry.propTypes = {
  phone: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SelectCountry.defaultProps = {
  phone: ''
};

export default SelectCountry;

import React, { Fragment } from 'react';
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
          width: '97%',
          marginBottom: '20px',
          marginLeft: '6px'
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

export default SelectCountry;

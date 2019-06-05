import React from 'react';
import PropTypes from 'prop-types';
import {
  InputLabel, FormControl, Select
} from '@material-ui/core';

const SelectCountry = (props) => {
  const { handleChange, Code } = props;
  return (
    <FormControl className="form-code">
      <InputLabel htmlFor="country-code">Code</InputLabel>
      <Select
        native
        required
        value={Code}
        name="Code"
        onChange={handleChange}
        inputProps={{
          name: 'Code',
        }}
      >
        <option value="" />
        <option value="+213">+213</option>
        <option value="+244">+244</option>
        <option value="+229">+229</option>
        <option value="+267">+267</option>
        <option value="+226">+226</option>
        <option value="+257">+257</option>
        <option value="+237">+237</option>
        <option value="+238">+238</option>
        <option value="+236">+236</option>
        <option value="+269">+269</option>
        <option value="+243">+243</option>
        <option value="+253">+253</option>
      </Select>
    </FormControl>
  );
};

SelectCountry.propTypes = {
  Code: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelectCountry;

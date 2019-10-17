/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';
import SearchSelect from 'react-select';
import 'react-phone-number-input/style.css';
import flags from 'react-phone-number-input/flags';
import PhoneInput from 'react-phone-number-input';
import InputRange from 'react-input-range';

import {
  Paper,
  Grid,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel
} from '@material-ui/core';
import {
  SupplierFormStyles,
  SearchSelectStyles
} from '../../../assets/styles/suppliers/addSupplierStyles';
import '../../../assets/styles/suppliers/sliderLabel.scss';
import ActionButtons from './ActionButtons';
import ImageUpload from './Inputs/ImageUpload';
import getOutletCountryCode from './Inputs/CountryCode';

const SupplierForm = (props) => {
  const {
    state: {
      name,
      email,
      emailError,
      emailHelperText,
      nameError,
      nameHelperText,
      lineError,
      lineHelperText,
      mobileNumber,
      mobileNumberError,
      mobileHelperText,
      addressLine1,
      addressLine2,
      lga,
      paymentTermsId,
      commentary,
      commentError,
      commentHelperText,
      countryValue,
      cities,
      cityValue,
      cityId,
      tierId,
      creditDays,
      logo,
      isDisabled,
      colorHasChanged,
      colorHasChangedCity
    },
    state,
    handleChange,
    handleNameChange,
    handleCommentChange,
    handleLineChange,
    onSelectFile,
    handleOnCropChange,
    handleClose,
    handleSave,
    handleSendForApproval,
    handleAddAnotherSupplier,
    handleTierChange,
    handleCountryChange,
    handleCityChange,
    handleMobileChange,
    handleEmailChange,
    handleOnDrop,
    initialData,
    handleColorChange,
    handleColorChangeCity,
    handleSliderChange,
    handleDragImage
  } = props;

  const { countries, outlet } = initialData;

  const [countryCode] = getOutletCountryCode(outlet);

  const disableButton = !name
    || !email
    || !mobileNumber
    || !addressLine1
    || !paymentTermsId
    || emailError
    || nameError
    || mobileNumberError
    || !cityId
    || !tierId
    || (!isDisabled && !creditDays);

  const days = [];

  for (let i = 1; i <= 10; i += 1) {
    days.push(i);
  }
  const countryList = [];
  if (countries) {
    countries.map(country => countryList.push({
      label: country.name,
      value: country.name,
      ...country
    }));
  }

  const cityList = [];
  if (cities.length > 1) {
    cities.map(city => cityList.push({
      label: city.name,
      value: city.name,
      ...city
    }));
  }
  // const classes = useStyles();
  return (
    <Paper style={SupplierFormStyles.paperForm}>
      <form>
        <Grid container spacing={24} style={SupplierFormStyles.gridContainer}>
          {/* row 4 brand, manufacturer */}
          <Grid item xs={6} style={SupplierFormStyles.childGrid}>
            <TextField
              required
              onChange={handleNameChange}
              type="text"
              label="Name"
              name="name"
              value={name}
              fullWidth
              error={nameError}
              helperText={nameHelperText}
            />
          </Grid>
          {/* work n tier */}
          <Grid item xs={6} style={SupplierFormStyles.tierField}>
            <FormControl fullWidth>
              <InputLabel htmlFor="tier">Tier</InputLabel>
              <Select
                required
                value={tierId}
                onChange={handleTierChange}
                inputProps={{
                  name: 'tierId',
                  id: 'tier'
                }}
              >
                <MenuItem className="tier" key={1} value={1}>
                  Manufacturer
                </MenuItem>
                <MenuItem className="tier" key={2} value={2}>
                  Importer
                </MenuItem>
                <MenuItem className="tier" key={3} value={3}>
                  1T wholesaler
                </MenuItem>
                <MenuItem className="tier" key={4} value={4}>
                  2T wholesaler
                </MenuItem>
                <MenuItem className="tier" key={5} value={5}>
                  3T wholesaler
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* email */}
          <Grid item xs={6} style={SupplierFormStyles.childGrid}>
            <TextField
              required
              label="Email"
              type="text"
              fullWidth
              name="email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailHelperText}
            />
          </Grid>
          {/* mobile */}
          <Grid item xs={6} style={SupplierFormStyles.paymentGrid}>
            <PhoneInput
              placeholder="Phone *"
              country={countryCode}
              flags={flags}
              value={mobileNumber}
              onChange={value => handleMobileChange(value)}
              style={{ fontSize: '12px' }}
              error={mobileNumberError ? mobileHelperText : ''}
            />
          </Grid>
          {/* addressline 1 */}
          <Grid item xs={12} style={SupplierFormStyles.lineGrid}>
            <TextField
              required
              label="Address Line 1"
              type="text"
              fullWidth
              name="addressLine1"
              value={addressLine1}
              onChange={handleLineChange}
              error={lineError}
              helperText={lineHelperText}
            />
          </Grid>
          {/* addressline 2 */}
          <Grid item xs={12} style={SupplierFormStyles.childGrid}>
            <TextField
              label="Address Line 2"
              type="text"
              fullWidth
              name="addressLine2"
              value={addressLine2}
              onChange={handleChange}
            />
          </Grid>
          {/* country */}
          <Grid variant="h6" item xs={4} style={SupplierFormStyles.childGrid}>
            <FormControl fullWidth onPointerDown={handleColorChange}>
              <InputLabel
                style={{
                  fontSize: '11px',
                  marginTop: '-8%',
                  color: colorHasChanged ? '#ada61f' : '#939393'
                }}
                htmlFor="Country"
              >
                Country *
              </InputLabel>
              {countryList && (
                <SearchSelect
                  required
                  options={countryList}
                  value={countryValue}
                  name="Country"
                  onChange={handleCountryChange}
                  label="Country *"
                  placeholder="Choose a country"
                  styles={SearchSelectStyles}
                />
              )}
            </FormControl>
          </Grid>
          {/* city */}
          <Grid item xs={4} style={SupplierFormStyles.childGrid}>
            <FormControl fullWidth onPointerDown={handleColorChangeCity}>
              <InputLabel
                style={{
                  fontSize: '11px',
                  marginTop: '-8%',
                  color: colorHasChangedCity ? '#ada61f' : '#939393'
                }}
                htmlFor="City"
              >
                City *
              </InputLabel>
              {cityList && (
                <SearchSelect
                  options={cityList}
                  placeholder="Select a country first"
                  name="City"
                  value={cityValue}
                  onChange={handleCityChange}
                  noOptionsMessage={() => 'Select or search country first'}
                  styles={SearchSelectStyles}
                />
              )}
            </FormControl>
          </Grid>

          {/* LGA */}
          <Grid item xs={4} style={SupplierFormStyles.childGrid}>
            <TextField
              label="Region"
              type="text"
              fullWidth
              name="lga"
              onChange={handleChange}
              value={lga}
            />
          </Grid>
          {/* Payment terms */}
          <Grid item xs={6} style={SupplierFormStyles.childGrid}>
            <FormControl fullWidth style={SupplierFormStyles.radioButton}>
              <FormLabel style={SupplierFormStyles.paymentGrid}>
                Payment terms *:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {' '}
              </FormLabel>
              <RadioGroup
                aria-label="payment terms"
                name="paymentTermsId"
                value={paymentTermsId}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="1" control={<Radio />} label="Cash on Delivery" />
                <FormControlLabel value="2" control={<Radio color="default" />} label="On Credit" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* credit days */}
          <Grid item xs={6} style={SupplierFormStyles.childGrid} className="inputSlider">
            <FormControl fullWidth>
              <InputRange
                className="InputRangeClassNames"
                disabled={isDisabled}
                ariaLabelledby="days"
                maxValue={90}
                minValue={0}
                value={creditDays}
                onChange={handleSliderChange}
              />
              <span style={{ opacity: isDisabled ? 0 : 1 }} className="sliderLabel">
                {`${creditDays} days`}
              </span>
              <span className="breakpoints" style={{ opacity: isDisabled ? 0 : 1 }}>
                <span className="fbreack">0day</span>
                <span className="sbreak">30dys</span>
                <span className="tbreak">60days</span>
                <span className="fbreak">90days</span>
              </span>
            </FormControl>
          </Grid>
          {/* commentary */}
          <Grid item xs={6} style={SupplierFormStyles.commentaryField}>
            <Typography style={SupplierFormStyles.textAreaLabel}>Commentary</Typography>
            <TextField
              type="text"
              fullWidth
              name="commentary"
              variant="outlined"
              multiline
              rows="10"
              value={commentary}
              onChange={handleCommentChange}
              error={commentError}
              helperText={commentHelperText}
            />
          </Grid>
          {/* Drag and drop zone */}
          <Grid item xs={6} style={SupplierFormStyles.childGrid}>
            <Typography style={SupplierFormStyles.textAreaLabel}>Upload Brand logo</Typography>
            <ImageUpload
              state={state}
              logo={logo}
              handleOnDrop={handleOnDrop}
              handleOnCropChange={handleOnCropChange}
              onSelectFile={onSelectFile}
              handleClose={handleClose}
              handleSave={handleSave}
              dragImage={handleDragImage}
            />
          </Grid>
          {/* Buttons */}
          <Grid item xs={6} />
          <Grid item xs={6} style={SupplierFormStyles.buttonGrid}>
            <ActionButtons
              disabled={disableButton}
              handleSendForApproval={handleSendForApproval}
              handleAddAnotherSupplier={handleAddAnotherSupplier}
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

SupplierForm.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  initialData: PropTypes.shape({
    cities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
      })
    ),
    countries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
      })
    ),
    outlet: PropTypes.instanceOf(Object)
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleCommentChange: PropTypes.func.isRequired,
  handleLineChange: PropTypes.func.isRequired,
  handleOnCropChange: PropTypes.func.isRequired,
  handleOnDrop: PropTypes.func.isRequired,
  onSelectFile: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleAddAnotherSupplier: PropTypes.func.isRequired,
  handleSendForApproval: PropTypes.func.isRequired,
  handleTierChange: PropTypes.func.isRequired,
  handleCountryChange: PropTypes.func.isRequired,
  handleCityChange: PropTypes.func.isRequired,
  handleMobileChange: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handleColorChange: PropTypes.func.isRequired,
  handleColorChangeCity: PropTypes.func.isRequired,
  handleSliderChange: PropTypes.func.isRequired,
  handleDragImage: PropTypes.func.isRequired
};

export default SupplierForm;

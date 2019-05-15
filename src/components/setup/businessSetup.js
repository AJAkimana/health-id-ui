import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import FileUpload from './fileUpload';
import { BusinessSetUpStyles } from '../../assets/css/setup';

const BusinessSetUp = (props) => {
  const {
    handleInPutChange,
    checked,
    handleImageDrop,
    errorHandler,
    onSelectFile,
    onCropChange,
    handleClose,
    handleSave,
    state,
  } = props;

  const {
    legalName,
    tradingName,
    businessEmail,
    addressLine1,
    addressLine2,
    phoneNumber,
    city,
    country,
    localGovernmentArea,
    website,
    twitter,
    instagram,
    logo,
    facebook,
    formError,
  } = state;

  return (
    <React.Fragment>
      <form>
        <Grid container spacing={24} justify="center">
          <Grid item xs={6}>
            <TextField
              required
              id="legalname"
              name="legalName"
              label="Legal Name"
              fullWidth
              autoComplete="legal name"
              value={legalName}
              error={legalName ? false : formError}
              helperText={legalName ? '' : errorHandler()}
              onChange={handleInPutChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              id="tradingname"
              name="tradingName"
              label="Trading Name"
              fullWidth
              autoComplete="trading name"
              value={tradingName}
              error={tradingName ? false : formError}
              helperText={tradingName ? '' : errorHandler()}
              onChange={handleInPutChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="addressLine1"
              label="Address line 1"
              fullWidth
              autoComplete="address-line1"
              value={addressLine1}
              error={addressLine1 ? false : formError}
              helperText={addressLine1 ? '' : errorHandler()}
              onChange={handleInPutChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="address2"
              name="addressLine2"
              label="Address line 2"
              fullWidth
              autoComplete="billing address-line2"
              value={addressLine2}
              onChange={handleInPutChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="lga"
              name="localGovernmentArea"
              label="Local Government Area"
              fullWidth
              autoComplete="local Government Area"
              value={localGovernmentArea}
              onChange={handleInPutChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="City"
              value={city}
              error={city ? false : formError}
              helperText={city ? '' : errorHandler()}
              onChange={handleInPutChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="Country"
              value={country}
              error={country ? false : formError}
              helperText={country ? '' : errorHandler()}
              onChange={handleInPutChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              id="phone"
              name="phoneNumber"
              label="Primary Phone #"
              fullWidth
              autoComplete="Your phone #"
              value={phoneNumber}
              error={phoneNumber ? false : formError}
              helperText={phoneNumber ? '' : errorHandler()}
              onChange={handleInPutChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              id="email"
              name="businessEmail"
              label="business Email"
              fullWidth
              autoComplete="Business Email"
              value={businessEmail}
              error={businessEmail ? false : formError}
              helperText={businessEmail ? '' : errorHandler()}
              onChange={handleInPutChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="website"
              name="website"
              label="Website"
              fullWidth
              autoComplete="Your Website"
              style={BusinessSetUpStyles.textField}
              value={website}
              onChange={handleInPutChange}
            />
            <TextField
              id="twitter"
              name="twitter"
              label="Twitter"
              fullWidth
              autoComplete="Your twitter"
              style={BusinessSetUpStyles.textField}
              value={twitter}
              onChange={handleInPutChange}
            />
            <TextField
              id="facebook"
              name="facebook"
              label="Facebook"
              fullWidth
              autoComplete="Your facebook"
              style={BusinessSetUpStyles.textField}
              value={facebook}
              onChange={handleInPutChange}
            />
            <TextField
              id="instagram"
              name="instagram"
              label="Instagram"
              fullWidth
              autoComplete="Your Instagram"
              style={BusinessSetUpStyles.textField}
              value={instagram}
              onChange={handleInPutChange}
            />
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" onChange={checked} />}
              label="Save and complete later in SETUP"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper style={BusinessSetUpStyles.paper}>
              <FileUpload
                state={state}
                handleImageDrop={handleImageDrop}
                logo={logo}
                onSelectFile={onSelectFile}
                onCropChange={onCropChange}
                handleClose={handleClose}
                handleSave={handleSave}
              />
            </Paper>
          </Grid>

        </Grid>

      </form>
    </React.Fragment>
  );
};

BusinessSetUp.propTypes = {
  handleInPutChange: PropTypes.func.isRequired,
  checked: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
  handleImageDrop: PropTypes.func.isRequired,
  errorHandler: PropTypes.func.isRequired,
  onSelectFile: PropTypes.func.isRequired,
  onCropChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default BusinessSetUp;

import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  RadioGroup, Radio, Typography, Paper, Button
} from '@material-ui/core';
import { RadioGroupStyles, ContentWrapper } from '../../assets/css/setup';
import receiptTemp01 from '../../assets/images/receiptTemp01.png';
import receiptTemp02 from '../../assets/images/receiptTemp02.png';
import OutletList from './outletList';
import ReceiptTemplate01 from '../utils/ReceiptTemplate01';
import Loader from '../shared/Loader';

const OutletSetUp = ({
  state,
  handleInPutChange,
  errorHandler,
  handleReceiptTemplateOpen,
  handleReceiptTemplateClose,
  handleTemplateOnChange,
  handleAddOutletButton,
  handleAddNewOutletButton,
  toggleRegisterDisplay,
  handleOutletEdit,
  handleOutletDelete,
}) => {
  const {
    localGovernmentArea,
    city,
    cities,
    country,
    countries,
    outletType,
    outletName,
    addressLine1,
    addressLine2,
    phoneNumber,
    dateLaunched,
    registerName,
    formError,
    outletsActive,
    outletIsLoading,
    edittingOutlet,
  } = state;

  return (
    <React.Fragment>
      {outletsActive ? (
        <OutletList
          state={state}
          handleAddNewOutletButton={handleAddNewOutletButton}
          toggleRegisterDisplay={toggleRegisterDisplay}
          handleOutletEdit={handleOutletEdit}
          handleOutletDelete={handleOutletDelete}
        />
      ) : (
        <form>
          <Grid container spacing={24} justify="center">
            <Grid item container spacing={24} style={ContentWrapper.wrapper}>
              <Grid item xs={12}>
                <TextField
                  id="outletname"
                  required
                  name="outletName"
                  label="Outlet Name"
                  fullWidth
                  value={outletName}
                  autoComplete="first name"
                  error={outletName ? false : formError}
                  helperText={outletName ? '' : errorHandler()}
                  onChange={handleInPutChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="addressline1"
                  required
                  name="addressLine1"
                  label="Address Line 1"
                  fullWidth
                  value={addressLine1}
                  autoComplete="last name"
                  error={addressLine1 ? false : formError}
                  helperText={addressLine1 ? '' : errorHandler()}
                  onChange={handleInPutChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="addressline2"
                  name="addressLine2"
                  label="Address Line 2"
                  fullWidth
                  value={addressLine2}
                  autoComplete="Address Line 2"
                  onChange={handleInPutChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="normal"
                  style={ContentWrapper.pickers}
                  label="Country"
                  name="country"
                  select
                  SelectProps={{ native: true }}
                  value={country}
                  onChange={handleInPutChange}
                >
                  <>
                    {countries && countries.map(item => (
                      <option key={item.id}>{item.name}</option>
                    ))}
                  </>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  margin="normal"
                  style={ContentWrapper.pickers}
                  label="City/Town"
                  name="city"
                  SelectProps={{ native: true }}
                  value={city}
                  onChange={handleInPutChange}
                >
                  <>
                    {cities && cities.map(item => (
                      <option key={item.id}>{item.name}</option>
                    ))}
                  </>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="lga"
                  name="localGovernmentArea"
                  label="Region"
                  fullWidth
                  autoComplete="local Government Area"
                  value={localGovernmentArea}
                  onChange={handleInPutChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="phoneno"
                  required
                  name="phoneNumber"
                  label="Phone #"
                  fullWidth
                  autoComplete="Phone #"
                  value={phoneNumber}
                  error={phoneNumber ? false : formError}
                  helperText={phoneNumber ? '' : errorHandler()}
                  onChange={handleInPutChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="datelaunched"
                  required
                  name="dateLaunched"
                  label="Date Launched"
                  type="date"
                  style={ContentWrapper.pickers}
                  defaultValue={dateLaunched}
                  error={dateLaunched ? false : formError}
                  helperText={dateLaunched ? '' : errorHandler()}
                  onChange={handleInPutChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} style={ContentWrapper.headers}>
              <Typography variant="h6">
              Outlet Type
              </Typography>
            </Grid>

            <Grid item xs={12} style={ContentWrapper.wrapper}>
              <RadioGroup
                name="outletType"
                aria-label="outlet"
                value={outletType}
                style={RadioGroupStyles.radioGroup}
                onChange={handleInPutChange}
                row
              >
                <FormControlLabel
                  value="storefront"
                  control={<Radio />}
                  label="Storefront"
                />
                <FormControlLabel
                  value="warehouse"
                  control={<Radio />}
                  label="Warehouse"
                />
                <div />
              </RadioGroup>
            </Grid>

            {outletType === 'storefront' && (
              <>
                <Grid item xs={12} style={ContentWrapper.headers}>
                  <Typography variant="h6">
                  Set up Register
                  </Typography>
                </Grid>

                <Grid item container spacing={24} style={ContentWrapper.wrapper}>
                  <Grid item xs={12}>
                    <TextField
                      id="registername"
                      required
                      name="registerName"
                      label="Register Name"
                      fullWidth
                      value={registerName}
                      autoComplete="first name"
                      error={registerName ? false : formError}
                      helperText={registerName ? '' : errorHandler()}
                      onChange={handleInPutChange}
                    />
                  </Grid>

                  <Typography style={ContentWrapper.receiptHeader}>
                  Select Receipt Template
                  </Typography>

                  <Grid item xs={12}>
                    <Grid container spacing={16}>
                      <Grid item xs={2} style={ContentWrapper.receiptsWrapper}>
                        <Paper onClick={handleReceiptTemplateOpen} style={ContentWrapper.receipts}>
                          <img src={receiptTemp01} alt="receiptTemp01" style={ContentWrapper.receiptTemp} />
                        </Paper>
                      </Grid>
                      <Grid item xs={2} style={ContentWrapper.receiptsWrapper}>
                        <Paper onClick={handleReceiptTemplateOpen} style={ContentWrapper.receipts}>
                          <img src={receiptTemp02} alt="receiptTemp01" style={ContentWrapper.receiptTemp} />
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <ReceiptTemplate01
                          state={state}
                          handleTemplateChange={handleTemplateOnChange}
                          handleReceiptTemplateClose={handleReceiptTemplateClose}
                          handleReceiptTemplateSubmit={handleReceiptTemplateClose}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
            <Grid item container style={ContentWrapper.buttonStyle}>
              <Grid item xs={3} />
              <Grid item xs={3}>
                {outletIsLoading
                  ? (
                    <Grid item style={ContentWrapper.loader}>
                      <Loader />
                    </Grid>
                  ) : (
                    <Button
                      onClick={handleAddOutletButton}
                      style={ContentWrapper.button}
                      color="primary"
                      variant="contained"
                      id="outlet-button"
                    >
                      {edittingOutlet ? 'done' : 'add outlet'}
                    </Button>
                  )}
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </React.Fragment>
  );
};

OutletSetUp.propTypes = {
  handleInPutChange: PropTypes.func.isRequired,
  errorHandler: PropTypes.func.isRequired,
  handleReceiptTemplateOpen: PropTypes.func.isRequired,
  handleReceiptTemplateClose: PropTypes.func.isRequired,
  handleTemplateOnChange: PropTypes.func.isRequired,
  handleAddOutletButton: PropTypes.func.isRequired,
  handleAddNewOutletButton: PropTypes.func.isRequired,
  toggleRegisterDisplay: PropTypes.func.isRequired,
  handleOutletEdit: PropTypes.func.isRequired,
  handleOutletDelete: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
};

export default OutletSetUp;

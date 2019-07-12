import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, Slide, TextField, Grid, Typography, Divider,
  FormControlLabel, Switch,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Loader from '../shared/Loader';
import PhoneField from './phoneField';
import { addCustomerDialog } from '../../assets/css/sellScreenStyles';
import CREATE_CUSTOMER from '../../mutations/sellScreen/createCustomerMutation';
import EDIT_CUSTOMER from '../../mutations/sellScreen/editCustomerMutation';


const styles = addCustomerDialog;

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const AddCustomerDialog = ({
  state,
  handleCustomerDialogClose,
  handleCustomerDialogInPutChange,
  handleAddCustomerButton,
  validateCustomerDialogInputs,
  updateCustomers,
  handlePrimaryPhoneChange,
  handleSecondaryPhoneChange,
  handleContactPhoneChange,
}) => {
  const {
    openCustomerDialog,
    firstName,
    lastName,
    email,
    primaryMobileNumber,
    secondaryMobileNumber,
    loyaltyMember,
    isLoading,
    nameHelper,
    emailHelper,
    mobileHelper,
    nameError,
    emailError,
    mobileError,
    address,
    region,
    city,
    cities,
    country,
    countries,
    emergencyContactName,
    emergencyContactEmail,
    emergencyContactNumber,
    isSelected
  } = state;
  return (
    <Mutation mutation={CREATE_CUSTOMER} update={updateCustomers}>
      {createCustomer => (
        <Mutation mutation={EDIT_CUSTOMER} update={updateCustomers}>
          {editCustomerBasicProfile => (
            <Dialog
              open={openCustomerDialog}
              maxWidth="sm"
              fullWidth
              TransitionComponent={Transition}
              aria-labelledby="add-customer-dialog"
              id="add-customer-dialog"
              BackdropProps={{
                invisible: true
              }}
            >
              <DialogTitle
                id="alert-dialog-slide-title"
                style={addCustomerDialog.dialogTitle}
              >
                {!isSelected ? 'Add New Customer' : 'Edit Customer'}
              </DialogTitle>
              <form
                onSubmit={event => handleAddCustomerButton(
                  event, createCustomer, editCustomerBasicProfile
                )}
              >
                <DialogContent>
                  <Grid container spacing={24}>
                    <Grid item xs={6} style={addCustomerDialog.dialogContentGrid}>
                      <TextField
                        id="firstname"
                        name="firstName"
                        label="First Name"
                        required
                        margin="dense"
                        fullWidth
                        value={firstName}
                        error={nameError}
                        helperText={nameHelper}
                        onChange={handleCustomerDialogInPutChange}
                      />
                      <Grid container item style={addCustomerDialog.phoneInput}>
                        <Typography variant="caption" style={addCustomerDialog.phoneInputLabel}>
                          Mobile #
                        </Typography>
                        <PhoneField
                          id="primarymobilenumber"
                          name="primaryMobileNumber"
                          value={primaryMobileNumber}
                          isSelected={isSelected}
                          onChange={handlePrimaryPhoneChange}
                        />
                        <Typography variant="caption" style={addCustomerDialog.phoneInputHelper}>
                          {primaryMobileNumber && mobileError ? mobileHelper : ''}
                        </Typography>
                      </Grid>
                      <TextField
                        id="email"
                        name="email"
                        label="Email"
                        margin="dense"
                        fullWidth
                        value={email}
                        error={email ? emailError : false}
                        helperText={email && emailHelper}
                        onChange={handleCustomerDialogInPutChange}
                      />
                      <TextField
                        id="country"
                        name="country"
                        label="Country"
                        margin="dense"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                        value={country}
                        onChange={handleCustomerDialogInPutChange}
                      >
                        <>
                          {countries && countries.map(item => (
                            <option key={item.id}>{item.name}</option>
                          ))}
                        </>
                      </TextField>
                    </Grid>
                    <Grid item xs={6} style={addCustomerDialog.dialogContentGrid}>
                      <TextField
                        id="lastname"
                        name="lastName"
                        label="Last Name"
                        margin="dense"
                        fullWidth
                        value={lastName}
                        onChange={handleCustomerDialogInPutChange}
                      />
                      <Grid container item style={addCustomerDialog.phoneInput}>
                        <Typography variant="caption" style={addCustomerDialog.phoneInputLabel}>
                          Other Phone #
                        </Typography>
                        <PhoneField
                          id="secondarymobilenumber"
                          name="secondaryMobileNumber"
                          value={secondaryMobileNumber}
                          isSelected={isSelected}
                          onChange={handleSecondaryPhoneChange}
                        />
                      </Grid>
                      <TextField
                        id="address"
                        name="address"
                        label="Address"
                        margin="dense"
                        fullWidth
                        value={address}
                        onChange={handleCustomerDialogInPutChange}
                      />
                      <TextField
                        id="city"
                        name="city"
                        label="City/Town"
                        margin="dense"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                        value={city}
                        onChange={handleCustomerDialogInPutChange}
                      >
                        <>
                          {cities && cities.map(item => (
                            <option key={item.id}>{item.name}</option>
                          ))}
                        </>
                      </TextField>
                    </Grid>
                    <Grid item xs={6} style={addCustomerDialog.dialogContentGrid}>
                      <TextField
                        id="region"
                        name="region"
                        label="Region"
                        margin="dense"
                        fullWidth
                        value={region}
                        onChange={handleCustomerDialogInPutChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={(
                          <Switch
                            checked={loyaltyMember}
                            name="loyaltyMember"
                            onChange={handleCustomerDialogInPutChange}
                            color="primary"
                          />
                        )}
                        label="Loyalty member?"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">Emergency Contact Information</Typography>
                      <Divider />
                    </Grid>
                    <Grid item xs={6} style={addCustomerDialog.dialogContentGridTop}>
                      <TextField
                        id="emergencycontactname"
                        name="emergencyContactName"
                        label="Contact Name"
                        margin="dense"
                        fullWidth
                        value={emergencyContactName}
                        onChange={handleCustomerDialogInPutChange}
                      />
                      <TextField
                        id="emergencycontactemail"
                        name="emergencyContactEmail"
                        label="Contact Email"
                        margin="dense"
                        fullWidth
                        value={emergencyContactEmail}
                        onChange={handleCustomerDialogInPutChange}
                      />
                    </Grid>
                    <Grid item xs={6} style={addCustomerDialog.dialogContentGridTop}>
                      <Grid container item style={addCustomerDialog.phoneInput}>
                        <Typography variant="caption" style={addCustomerDialog.phoneInputLabel}>
                          Contact Number
                        </Typography>
                        <PhoneField
                          id="emergencycontactnumber"
                          name="emergencyContactNumber"
                          value={emergencyContactNumber}
                          isSelected={isSelected}
                          onChange={handleContactPhoneChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Grid item xs={12} align="right" style={addCustomerDialog.buttonWrapper}>
                    { isLoading ? (<Loader />)
                      : [
                        <Button
                          key="cancel-button"
                          variant="contained"
                          style={addCustomerDialog.cancelButton}
                          color="secondary"
                          onClick={handleCustomerDialogClose}
                        >
                            Cancel
                        </Button>,
                        <Button
                          id="add-button"
                          key="add-button"
                          variant="contained"
                          type="submit"
                          disabled={validateCustomerDialogInputs()}
                          color="primary"
                          style={addCustomerDialog.addButton}
                        >
                          {!isSelected ? 'Add' : 'Done'}
                        </Button>
                      ]
                    }
                  </Grid>
                </DialogActions>
              </form>
            </Dialog>
          )}
        </Mutation>
      )}
    </Mutation>
  );
};

AddCustomerDialog.propTypes = {
  state: PropTypes.instanceOf(Object),
  handleCustomerDialogClose: PropTypes.func.isRequired,
  handleCustomerDialogInPutChange: PropTypes.func.isRequired,
  handleAddCustomerButton: PropTypes.func.isRequired,
  validateCustomerDialogInputs: PropTypes.func.isRequired,
  updateCustomers: PropTypes.func.isRequired,
  handlePrimaryPhoneChange: PropTypes.func.isRequired,
  handleSecondaryPhoneChange: PropTypes.func.isRequired,
  handleContactPhoneChange: PropTypes.func.isRequired,
};

AddCustomerDialog.defaultProps = {
  state: {}
};

export default withStyles(styles)(AddCustomerDialog);

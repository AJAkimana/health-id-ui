import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Typography, TextField, Grid, Button, Chip, Icon, IconButton, InputAdornment
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import profileStyles from '../../assets/styles/profile/profileStyles';
import NavBar from '../shared/Navbar';
import Footer from '../shared/Footer';
import Loader from '../shared/Loader';
import ProfileImageUpload from './uploadProfileImage';

const styles = profileStyles;

const ProfileData = (props) => {
  const {
    handleDoneButton,
    handleSkipButton,
    handleInputChange,
    state,
    classes,
    handleArrowButtonClick,
    onSelectFile,
    onCropChange,
    handleClose,
    handleSave,
    handleClickShowPassword,
    handleClickShowPassword1,
    handleClickShowPassword2
  } = props;

  const {
    firstName,
    lastName,
    username,
    email,
    mobileNumber,
    role,
    jobTitle,
    startingDate,
    birthday,
    users,
    oldPassword,
    newPassword,
    confirmPassword,
    isButtonDisabled,
    isLoading,
    serverError,
    confirmPasswordError,
    showPassword,
    showPassword1,
    showPassword2
  } = state;

  const message = 'Not Available';

  return (
    <React.Fragment>
      <NavBar />
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.arrowButtonGrid}
      >
        <div className={classes.arrowButtonDiv}>
          <Button onClick={handleArrowButtonClick}>
            <Icon className={classes.arrowIcon}>arrow_back</Icon>
          </Button>
          <span className={classes.arrowButtonLabel}>Manage Profile</span>
        </div>

      </Grid>

      <Paper className={classes.paper}>
        <div className={classes.dividerDiv}>
          <Typography paragraph variant="h6" align="left" gutterBottom className={classes.dividerHeaders}>
            Personal Details
          </Typography>
        </div>

        <Grid container spacing={24} className={classes.containerGrid}>
          <Grid item xs={4} className={classes.childGrids}>
            <TextField
              className={classes.newTextFields}
              id="firstName"
              name="firstName"
              label="First Name"
              value={firstName || message}
              fullWidth
              InputProps={{ disableUnderline: true, readOnly: true }}
            />

            <TextField
              className={classes.newTextFields}
              id="username"
              name="username"
              label="Username"
              value={username || ''}
              fullWidth
              InputProps={{ disableUnderline: !!username }}
              onChange={handleInputChange}
            />

            <TextField
              className={classes.newTextFields}
              id="mobileNumber"
              name="mobileNumber"
              label="Phone #"
              value={mobileNumber || ''}
              fullWidth
              InputProps={{ disableUnderline: !!mobileNumber }}
              onChange={handleInputChange}
            />

          </Grid>
          <Grid item xs={4} className={classes.childGrids}>
            <TextField
              className={classes.newTextFields}
              id="lastName"
              name="lastName"
              label="Last Name"
              value={lastName || message}
              fullWidth
              InputProps={{ disableUnderline: true, readOnly: true }}
            />

            <TextField
              className={classes.newTextFields}
              id="email"
              name="email"
              label="Email"
              value={email || ''}
              fullWidth
              InputProps={{ disableUnderline: !!email }}
              onChange={handleInputChange}
            />

            <TextField
              className={classes.birthdayTextField}
              id="birthday"
              label="Birthday"
              value={birthday || message}
              fullWidth
              InputProps={{ disableUnderline: true, readOnly: true }}
            />
          </Grid>

          <Grid item xs={4}>
            <div className={classes.profilePhotoDiv}>
              <ProfileImageUpload
                state={state}
                onSelectFile={onSelectFile}
                onCropChange={onCropChange}
                handleClose={handleClose}
                handleSave={handleSave}
              />
            </div>
          </Grid>
        </Grid>

        <div className={classes.dividerDiv}>
          <Typography paragraph variant="h6" align="left" gutterBottom className={classes.dividerHeaders}>
          Business Details
          </Typography>
        </div>

        <Grid container spacing={24} className={classes.containerGrid}>
          <Grid item xs={4} className={classes.childGrids}>
            <TextField
              className={classes.newTextFields}
              id="role"
              name="role"
              label="Role"
              value={role || message}
              fullWidth
              InputProps={{ disableUnderline: true, readOnly: true }}
            />

            <TextField
              className={classes.newTextFields}
              id="startingDate"
              name="startingDate"
              label="Start Date"
              fullWidth
              value={startingDate || message}
              autoComplete="Start Date"
              InputProps={{ disableUnderline: true, readOnly: true }}
            />
          </Grid>

          <Grid item xs={4} className={classes.childGrids}>
            <TextField
              className={classes.newTextFields}
              id="jobTitle"
              name="jobTitle"
              label="Job Title"
              value={jobTitle || message}
              fullWidth
              InputProps={{ disableUnderline: true, readOnly: true }}
            />

            <TextField
              className={classes.birthdayTextField}
              id="weeklytarget"
              name="weeklytarget"
              label="Weekly Target"
              value={message}
              fullWidth
              InputProps={{ disableUnderline: true, readOnly: true }}
            />
          </Grid>

          <Grid item xs={4} className={classes.assignedOutletsGrid}>
            <div className={classes.assignedOutletsHeader}>
              <Typography variant="caption">Assigned Outlet(s)</Typography>
            </div>
            {users.length ? users.map(item => (
              <div key={item.name}>
                <Chip
                  label={item.name}
                  className={classes.chips}
                  variant="outlined"
                  color="default"
                />
              </div>
            ))
              : message
            }
          </Grid>
        </Grid>

        <div className={classes.dividerDiv}>
          <Typography paragraph variant="h6" align="left" gutterBottom className={classes.dividerHeaders}>
          Change Password
          </Typography>
        </div>
        <Grid container spacing={24} className={classes.changePasswordGrid}>
          <Grid item xs={12} className={classes.changePasswordChildGrids}>
            <TextField
              className={classes.newTextFields}
              id="oldpassword"
              name="oldPassword"
              type={showPassword ? 'text' : 'password'}
              label="Current Password"
              placeholder="Password must contain atleast 8 characters, a number and a capital letter."
              fullWidth
              value={oldPassword || ''}
              error={!!serverError && serverError.includes('old password')}
              helperText={serverError.includes('old password') ? serverError : ''}
              onChange={handleInputChange}
              InputProps={{
                endAdornment:
  <InputAdornment position="end">
    <IconButton
      onClick={handleClickShowPassword}
    >
      {showPassword ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  </InputAdornment>
              }}

            />

            <TextField
              className={classes.newTextFields}
              id="newpassword"
              name="newPassword"
              type={showPassword1 ? 'text' : 'password'}
              label="New Password"
              placeholder="Password must contain atleast 8 characters, a number and a capital letter."
              fullWidth
              value={newPassword || ''}
              error={!!serverError && serverError.includes('at least 8 characters')}
              helperText={serverError.includes('at least 8 characters') ? serverError : ''}
              onChange={handleInputChange}
              InputProps={{
                endAdornment:
  <InputAdornment position="end">
    <IconButton
      onClick={handleClickShowPassword1}
    >
      {showPassword1 ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  </InputAdornment>
              }}
            />

            <TextField
              className={classes.birthdayTextField}
              id="confirmpassword"
              name="confirmPassword"
              type={showPassword2 ? 'text' : 'password'}
              label="confirm Password"
              placeholder="Password must contain atleast 8 characters, a number and a capital letter."
              fullWidth
              value={confirmPassword || ''}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError || ''}
              onChange={handleInputChange}
              InputProps={{
                endAdornment:
  <InputAdornment position="end">
    <IconButton
      onClick={handleClickShowPassword2}
    >
      {showPassword2 ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  </InputAdornment>
              }}

            />

            <div className={classes.loaderDiv}>
              {
                isLoading ? (<Loader />)

                  : (
                    <Fragment>
                      <Button
                        variant="contained"
                        className={classes.skipButton}
                        onClick={handleSkipButton}
                      >
                  Skip
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        disabled={isButtonDisabled}
                        className={classes.doneButton}
                        onClick={handleDoneButton}
                      >
                  Done
                      </Button>
                    </Fragment>
                  )
              }
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Footer />
    </React.Fragment>
  );
};

ProfileData.propTypes = {
  handleDoneButton: PropTypes.func.isRequired,
  handleSkipButton: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleArrowButtonClick: PropTypes.func.isRequired,
  onSelectFile: PropTypes.func.isRequired,
  onCropChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleClickShowPassword1: PropTypes.func.isRequired,
  handleClickShowPassword2: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(styles)(ProfileData);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, Typography, TextField, Grid, Button
} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import ProfilePhoto from '../../assets/images/avatarr.png';
import NavBar from '../shared/Navbar';
import Footer from '../shared/Footer';
import profileStyles from '../../assets/styles/profile/profileStyles';
import '../../assets/styles/profile/profile.css';

const styles = profileStyles;

const UserProfileComplete = (props) => {
  const {
    classes,
    state,
    handleManageProfileButton
  } = props;

  const {
    firstName,
    lastName,
    username,
    email,
    mobileNumber,
    profileImage,
    role,
    jobTitle,
    startingDate,
    birthday,
    users
  } = state;

  const message = 'Not Available';

  return (
    <React.Fragment>
      <NavBar />
      <div
        className={classes.manageProfileDiv}
      >
        <Button
          variant="contained"
          onClick={handleManageProfileButton}
          className={classes.manageProfileButton}
        >
            Manage Profile
        </Button>
      </div>

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
              value={username || message}
              fullWidth
              InputProps={{ disableUnderline: true, readOnly: true }}
            />

            <TextField
              className={classes.newTextFields}
              id="mobileNumber"
              name="mobileNumber"
              label="Phone #"
              value={mobileNumber || message}
              fullWidth
              InputProps={{ disableUnderline: true, readOnly: true }}
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
              value={email || message}
              fullWidth
              InputProps={{ disableUnderline: true, readOnly: true }}
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
            <div className={classes.profilePhotoDiv2}>

              <div>
                <img
                  src={profileImage || ProfilePhoto}
                  alt="profile"
                  className={
                    profileImage ? classes.profilePhotoContainer2 : classes.profilePhotoContainer
                  }
                />
              </div>

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
      </Paper>
      <Footer />
    </React.Fragment>
  );
};

UserProfileComplete.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
  handleManageProfileButton: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserProfileComplete);

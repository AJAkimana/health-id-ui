import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';

// MATERIAL UI COMPONENTS
import {
  Grid,
  Paper,
  Button,
  Typography,
  TextField,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText
} from '@material-ui/core';

// IMAGES AND ICONS
import ArrowBack from '@material-ui/icons/ArrowBack';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Avatar from '../../assets/images/settingsAvatar.png';

// SHARED COMPONENTS
import Dashboard from '../shared/Dashboard/Dashboard';

import { MainProfileStyles as styles, SetupHeader } from '../../assets/styles/setup';
import UPDATE_USER_PASSWORD from '../../mutations/updateUserPassword';
import notify from '../shared/Toaster';

export class ManageProfile extends Component {
  constructor(props) {
    super(props);
    const { me } = props.session;
    this.state = {
      firstName: me && me.firstName ? me.firstName : 'N/A',
      lastName: me && me.lastName ? me.lastName : 'N/A',
      username: me && me.username ? me.username : 'N/A',
      email: me && me.email ? me.email : 'N/A',
      mobileNumber: me && me.mobileNumber ? me.mobileNumber : 'N/A',
      birthday: me && me.birthday ? me.birthday : 'N/A',
      role: me && me.role ? me.role : 'N/A',
      startingDate: me && me.startingDate ? me.startingDate : 'N/A',
      jobTitle: me && me.jobTitle ? me.jobTitle : 'N/A',
      weeklyTarget: me && me.weeklyTarget ? me.weeklyTarget : 'N/A',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      errors: {
        status: false,
        message: ''
      },
      samePasswordError: {
        status: false,
        message: ''
      },
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errors: {
        status: false,
        message: ''
      },
      samePasswordError: {
        status: false,
        message: ''
      }
    });
  }

  handleClickShowPassword = (name) => {
    const { [name]: status } = this.state;
    this.setState(
      { [name]: !status }
    );
  }

  handleSubmit = () => {
    const { updatePassword } = this.props;
    const { currentPassword, newPassword, confirmPassword } = this.state;

    if (newPassword !== confirmPassword) {
      window.scrollTo({
        top: 370,
        left: 0,
        behavior: 'smooth'
      });
      return notify('The new password and the confirmed password do not match');
    }
    if (currentPassword === newPassword) {
      this.setState({
        samePasswordError: {
          status: true,
          message: 'The password entered is the same as the old password'
        }
      });
      window.scrollTo({
        top: 370,
        left: 0,
        behavior: 'smooth'
      });
      return notify('The current password entered is the same as the new password');
    }

    updatePassword(
      {
        variables: {
          password: [
            {
              oldPassword: currentPassword,
              newPassword
            }
          ]
        }
      }
    )
      .then(
        ({ data }) => {
          const { updateUser } = data;
          const userEmail = updateUser.user.email;
          this.setState(
            {
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }
          );
          return notify(`Password for ${userEmail} updated successfully`);
        }
      )
      .catch(
        (error) => {
          const { graphQLErrors } = error;
          const { message } = graphQLErrors[0];
          window.scrollTo({
            top: 370,
            left: 0,
            behavior: 'smooth'
          });
          return this.setState(
            {
              errors: {
                status: true,
                message
              }
            }
          );
        }
      );
    return null;
  }

  render() {
    const { session } = this.props;
    const {
      firstName,
      lastName,
      username,
      email,
      birthday,
      mobileNumber,
      role,
      startingDate,
      jobTitle,
      weeklyTarget,
      currentPassword,
      newPassword,
      confirmPassword,
      showCurrentPassword,
      showNewPassword,
      showConfirmPassword,
      errors,
      samePasswordError,
    } = this.state;

    return (
      <Fragment>
        <Dashboard isActive="grid9" session={session} />
        <Grid container style={styles.container}>
          <Grid item xs={1} style={SetupHeader.backBox}>
            <Button style={SetupHeader.backButton}>
              <Link to="/main_setup" style={SetupHeader.link}>
                <ArrowBack fontSize="large" />
              </Link>
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Grid style={styles.profileHeader}>
              <Typography variant="h5">
                Manage Profile
              </Typography>
              <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                Save Changes
              </Button>
            </Grid>
            <Paper style={styles.paper}>
              <Typography variant="h6" style={styles.contentHeader}>
                Personal Details
              </Typography>
              <Grid item style={styles.profileBox}>
                <Grid item xs={4} style={styles.formRow}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={firstName}
                    margin="normal"
                    style={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Username"
                    value={username}
                    margin="normal"
                    style={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Phone #"
                    value={mobileNumber}
                    margin="normal"
                    style={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4} style={styles.formRow}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={lastName}
                    margin="normal"
                    style={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    margin="normal"
                    style={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Birthday"
                    value={birthday}
                    margin="normal"
                    style={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4} style={styles.avatarIconBox}>
                  <img src={Avatar} alt="User" style={styles.avatarIcon} />
                </Grid>
              </Grid>
              <Typography variant="h6" style={styles.contentHeader}>
                Business Details
              </Typography>
              <Grid item style={styles.profileBox}>
                <Grid item xs={4} style={styles.formRow}>
                  <TextField
                    fullWidth
                    label="Role"
                    value={role.name}
                    margin="normal"
                    style={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Starting Date"
                    value={startingDate}
                    margin="normal"
                    style={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4} style={styles.formRow}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    value={jobTitle}
                    margin="normal"
                    style={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Weekly Target"
                    value={weeklyTarget}
                    margin="normal"
                    style={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4} style={styles.formRow}>
                  <TextField
                    fullWidth
                    label="Assigned Outlet"
                    value=""
                    margin="normal"
                    style={styles.textField}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                </Grid>
              </Grid>
              <Typography variant="h6" style={styles.contentHeader}>
                Change Password
              </Typography>
              <Grid item xs={10} style={styles.passwordBox}>
                <FormControl fullWidth margin="normal" error={errors.status}>
                  <Input
                    name="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={this.handleInputChange}
                    placeholder="Current Password"
                    endAdornment={
                      (
                        <InputAdornment position="end">
                          <IconButton aria-label="Toggle password visibility" onClick={() => this.handleClickShowPassword('showCurrentPassword')}>
                            {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  />
                  {
                    errors.status
                    && <FormHelperText>{errors.message}</FormHelperText>
                  }
                </FormControl>
                <FormControl fullWidth margin="normal" error={samePasswordError.status}>
                  <Input
                    name="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={this.handleInputChange}
                    placeholder="New Password"
                    endAdornment={
                      (
                        <InputAdornment position="end">
                          <IconButton aria-label="Toggle password visibility" onClick={() => this.handleClickShowPassword('showNewPassword')}>
                            {showNewPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  />
                  {
                    samePasswordError.status
                    && <FormHelperText>{samePasswordError.message}</FormHelperText>
                  }
                </FormControl>
                <FormControl fullWidth margin="normal" error={newPassword !== confirmPassword}>
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={this.handleInputChange}
                    placeholder="Confirm Password"
                    endAdornment={
                      (
                        <InputAdornment position="end">
                          <IconButton aria-label="Toggle password visibility" onClick={() => this.handleClickShowPassword('showConfirmPassword')}>
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  />
                  {
                    newPassword !== confirmPassword
                    && <FormHelperText>Password do not match</FormHelperText>
                  }
                </FormControl>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

ManageProfile.propTypes = {
  updatePassword: PropTypes.func.isRequired,
};

ManageProfile.propTypes = {
  session: PropTypes.shape({}).isRequired,
};

export default compose(
  graphql(UPDATE_USER_PASSWORD, { name: 'updatePassword' }),
)(ManageProfile);

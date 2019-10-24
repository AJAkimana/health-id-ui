import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import axios from 'axios';

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
import withAuth from '../withAuth';
import ImageUpload from '../products/AddProduct/Inputs/ImageUpload';
import { MainProfileStyles as styles, SetupHeader } from '../../assets/styles/setup';
import UPDATE_USER_PASSWORD from '../../mutations/updateUserPassword';
import UPDATE_USER_INFO from '../../mutations/updateUserProfileMutation';
import verifyFile from '../../utils/products/verifyFile';
import notify from '../shared/Toaster';

const UPDATE_USER = graphql(UPDATE_USER_INFO, { name: 'updateUserInfo' });
const UPDATE_PASSWORD = graphql(UPDATE_USER_PASSWORD, { name: 'updatePassword' });
export class ManageProfile extends Component {
  constructor(props, context) {
    super(props, context);
    const { me } = props.session;
    this.state = {
      initialUserData: {
        username: me && me.username ? me.username : 'N/A',
        email: me && me.email ? me.email : 'N/A',
        secondaryEmail: me && me.secondaryEmail ? me.secondaryEmail : 'N/A',
        mobileNumber: me && me.mobileNumber ? me.mobileNumber : 'N/A',
      },
      firstName: me && me.firstName ? me.firstName : 'N/A',
      lastName: me && me.lastName ? me.lastName : 'N/A',
      username: me && me.username ? me.username : 'N/A',
      email: me && me.email ? me.email : 'N/A',
      secondaryEmail: me && me.secondaryEmail ? me.secondaryEmail : 'N/A',
      mobileNumber: me && me.mobileNumber ? me.mobileNumber : 'N/A',
      profileImage: me && me.profileImage ? me.profileImage : 'N/A',
      secondaryPhoneNumber: me && me.secondaryPhoneNumber ? me.secondaryPhoneNumber : 'N/A',
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
      crop: {
        aspect: 1 / 1
      },
    };
  }

  handleImageDrop = (file) => {
    const { updateUserInfo } = this.props;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${process.env.UPLOAD_PRESET}`);
    formData.append('api_key', `${process.env.API_KEY}`);
    formData.append('timestamp', (Date.now() / 1000) || 0);

    return axios.post(`${process.env.CLOUDINARY_URL}`, formData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    }).then((response) => {
      const { data } = response;
      const fileURL = data.secure_url;
      this.setState({
        profileImage: fileURL
      });
      this.handleUserUpdate(updateUserInfo, { profileImage: fileURL });
    }).catch(() => notify('There was an error uploading the image'));
  }

  getCroppedImg = (imageFile, pixelCrop, fileName) => {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    const promise = new Promise((resolve) => {
      image.onload = (() => {
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
        resolve();
      });
      image.src = imageFile;
    }).then(() => new Promise((resolve) => {
      canvas.toBlob((blob) => {
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg');
    }));
    return promise;
  }

  onSelectFile = (e) => {
    const { files } = e.target;
    const imageFile = e.target.files[0];
    const maxFileSize = 1000000; // bytes
    const acceptedFileType = 'image/jpg, image/jpeg, image/JPEG, image/png, image/PNG';
    if (files && files.length > 0) {
      const verified = verifyFile(files, maxFileSize, acceptedFileType);
      if (verified) {
        this.setState({
          fileName: files[0].name,
          imageFile
        });

        const reader = new FileReader();
        reader.addEventListener('load', () => {
          this.setState({
            src: reader.result,
            open: true
          });
        }, false);
        reader.readAsDataURL(imageFile);
      }
    }
  }

  handleOnCropChange = (crop) => {
    this.setState({ crop });
  }

  handleSave = () => {
    const {
      src,
      fileName,
      crop
    } = this.state;
    this.getCroppedImg(src, crop, fileName).then((data) => {
      this.handleImageDrop(data);
      this.setState({
        src: '',
        open: false
      });
    });
  }

  handleClose = () => {
    const { imageFile } = this.state;
    this.setState({
      src: '',
      open: false
    });
    this.handleImageDrop(imageFile);
  }

  isUserDataChanged = (initialData, newData) => {
    let isDataChanged = false;
    let data = {};
    if (initialData.email !== newData.email) {
      isDataChanged = true;
      data = { ...data, email: newData.email };
    }

    if (initialData.mobileNumber !== newData.mobileNumber) {
      isDataChanged = true;
      data = { ...data, mobileNumber: newData.mobileNumber };
    }
    if (initialData.username !== newData.username) {
      isDataChanged = true;
      data = { ...data, username: newData.username };
    }

    return { isDataChanged, data };
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

  handleInputEmail = (event) => {
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

  handlePassword = (currentPassword, newPassword, confirmPassword, updatePassword) => {
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
          if (currentPassword && newPassword && confirmPassword) {
            localStorage.clear();
            window.location.replace('/');
          }
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
  }

  handleUserUpdate=(updateUserInfo, variables) => {
    updateUserInfo({
      variables
    }).then(({ data }) => {
      const { updateUser } = data;
      const userName = updateUser.user.username;
      if (updateUser.user.email !== this.state.initialUserData.email) {
        localStorage.clear();
        window.location.replace('/');
      }
      if (updateUser) {
        return notify(`Profile for ${userName} updated successfully`);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  handleSubmit = () => {
    const { updatePassword, updateUserInfo } = this.props;
    const {
      initialUserData,
      currentPassword,
      newPassword,
      confirmPassword,
      username,
      email,
      secondaryEmail,
      mobileNumber,
      secondaryPhoneNumber,
      profileImage
    } = this.state;
    const newData = {
      username,
      email,
      secondaryEmail,
      mobileNumber,
      secondaryPhoneNumber,
      profileImage
    };
    const { isDataChanged, data } = this.isUserDataChanged(initialUserData, newData);
    const isPasswordChanged = currentPassword && newPassword && confirmPassword;
    if (isDataChanged) {
      return this.handleUserUpdate(updateUserInfo, data);
    }
    return isPasswordChanged
      ? this.handlePassword(currentPassword, newPassword, confirmPassword, updatePassword)
      : notify('Your profile has not been updated ');
  }

  render() {
    const { session } = this.props;
    const {
      firstName,
      lastName,
      username,
      profileImage,
      email,
      secondaryEmail,
      birthday,
      mobileNumber,
      secondaryPhoneNumber,
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
              { (role.name !== 'Master Admin') ? (
                <div>
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
                        name="mobileNumber"
                        value={mobileNumber}
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={styles.textField}
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
                        label="Birthday"
                        name="birthday"
                        value={birthday}
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={styles.textField}
                        InputProps={{ disableUnderline: true, readOnly: false }}
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={email}
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={styles.textField}
                      />
                    </Grid>
                    <Grid item xs={4} style={styles.avatarIconBox}>
                      <ImageUpload
                        state={this.state}
                        profileImage={profileImage}
                        handleOnDrop={this.handleOnDrop}
                        handleOnCropChange={this.handleOnCropChange}
                        onSelectFile={this.onSelectFile}
                        handleClose={this.handleClose}
                        handleSave={this.handleSave}
                        style={styles.avatarIcon}
                      />
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
                </div>
              ) : (
                <div>
                  <Typography variant="h6" style={styles.contentHeader}>
                Manage Account
                  </Typography>
                  <Grid item xs={10} style={styles.profileForm}>
                    <FormControl fullWidth margin="normal" error={errors.status}>
                      <TextField
                        fullWidth
                        label="First name"
                        name="firstName"
                        value={firstName}
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={styles.textField}
                      />
                      <TextField
                        fullWidth
                        label="Last name"
                        name="lastName"
                        value={lastName}
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={styles.textField}
                      />
                      <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={username}
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={styles.textField}
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={email}
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={styles.textField}
                      />
                      <TextField
                        fullWidth
                        label="Secondary Email"
                        name="secondaryEmail"
                        value={secondaryEmail}
                        onChange={this.handleInputChange}
                        margin="normal"
                        style={styles.textField}
                      />
                      <Grid item xs={12} style={styles.profileBox}>
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            label="Phone #"
                            name="mobileNumber"
                            value={mobileNumber}
                            onChange={this.handleInputChange}
                            margin="normal"
                            style={styles.textField}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            label="Secondary Phone #"
                            name="secondaryPhoneNumber"
                            value={secondaryPhoneNumber}
                            onChange={this.handleInputChange}
                            margin="normal"
                            style={styles.textField}
                          />
                        </Grid>
                      </Grid>
                    </FormControl>
                  </Grid>
                </div>
              )}
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
  session: PropTypes.shape({
    me: PropTypes.shape({
      username: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      mobileNumber: PropTypes.string,
      birthday: PropTypes.string,
      startingDate: PropTypes.string,
      jobTitle: PropTypes.string,
      weeklyTarget: PropTypes.string,

      role: PropTypes.shape({
        name: PropTypes.string,
      })
    })
  }).isRequired,
};
ManageProfile.defaultProps = {
  session: { me: {} },
  history: {},
};

export default withAuth(compose(
  UPDATE_PASSWORD, UPDATE_USER
)(ManageProfile));

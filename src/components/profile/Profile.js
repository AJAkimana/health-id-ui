import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Paper } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import UPDATE_USER_INFO from '../../queries/updateUserQuery';
import UPDATE_USER from '../../mutations/updateUserMutation';
import FinalScreen from '../setup/finalScreen';
import UserProfileComplete from './UserProfileComplete';
import ProfileData from './ProfileData';
import profileStyles from '../../assets/css/profileStyles';
import notify from '../shared/Toaster';

const styles = profileStyles;
export class UserProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    newEmail: '',
    mobileNumber: '',
    profileImage: '',
    birthday: '',
    role: '',
    jobTitle: '',
    startingDate: '',
    users: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    password: '',
    serverError: '',
    confirmPasswordError: '',
    finalScreen: false,
    isDone: false,
    isButtonDisabled: true,
    isLoading: false,
    fileName: '',
    originalImageFile: '',
    src: '',
    open: false,
    crop: {
      x: 100,
      y: 100,
      width: 100,
      height: 100,
    },
    croppedImage: '',
    showPassword: true,
    showPassword1: true,
    showPassword2: true,

  };

  componentWillReceiveProps(nextProps) {
    nextProps && this.fetchUserData(nextProps.userData);
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickShowPassword1 = () => {
    this.setState(state => ({ showPassword1: !state.showPassword1 }));
  };

  handleClickShowPassword2 = () => {
    this.setState(state => ({ showPassword2: !state.showPassword2 }));
  };

  handleDoneButton = () => {
    this.updateUserData();
  }

  handleSkipButton = () => {
    this.setState(state => ({
      finalScreen: !state.finalScreen,
    }));
  }

  handleManageProfileButton = () => {
    this.setState(state => ({
      ...state,
      isDone: false,
      finalScreen: false,
      isButtonDisabled: true,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value, isButtonDisabled: false, confirmPasswordError: '', serverError: ''
    });
  }

  handleArrowButtonClick = () => {
    this.setState(state => ({
      isDone: !state.isDone,
    }));
  }

  handlePasswordMatch = () => {
    const { newPassword, confirmPassword } = this.state;
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        return true;
      }
    }
    return false;
  }

  fetchUserData = (userData) => {
    const { me, error } = userData;

    if (error) {
      return this.setState({ serverError: error.message.slice(14) });
    }

    const {
      birthday, email, firstName,
      jobTitle, lastName, mobileNumber, profileImage,
      role, startingDate, username, users
    } = me;

    const profileImageString = profileImage.includes('Profile_Picture_Placeholder') ? '' : profileImage;

    return this.setState({
      firstName,
      lastName,
      username,
      email,
      newEmail: email,
      mobileNumber,
      profileImage: profileImageString,
      role: role.name,
      jobTitle,
      startingDate,
      birthday,
      users
    });
  }

  handleSelectiveUpdate = (updatedVariables) => {
    this.setState({ serverError: '' });

    const { updateUser } = this.props;

    updateUser({
      variables: updatedVariables
    }).then((results) => {
      const successMessage = results.data.updateUser.success;
      const updatedUserData = results.data.updateUser.user;

      this.setState({
        username: updatedUserData.username,
        email: updatedUserData.email,
        mobileNumber: updatedUserData.mobileNumber
      });

      notify(successMessage);
      this.setState({ isLoading: false, isDone: true });
    }).catch((error) => {
      this.setState({ isLoading: false });
      return this.setState({ serverError: error.message.slice(14) });
    });
  };

  handlePasswordChange = () => {
    const {
      username,
      email,
      newEmail,
      profileImage,
      mobileNumber,
      oldPassword,
      newPassword,
      isLoading,
      serverError,
    } = this.state;

    this.setState({ isLoading: !isLoading });

    let stateVariables = {};

    const finalPassword = [{ oldPassword, newPassword }];

    if (username) {
      const usernamePair = { username };
      stateVariables = { ...stateVariables, ...usernamePair };
    }
    if (mobileNumber) {
      const mobileNumberPair = { mobileNumber };
      stateVariables = { ...stateVariables, ...mobileNumberPair };
    }
    if (newEmail && newEmail !== email) {
      const emailPair = { email };
      stateVariables = { ...stateVariables, ...emailPair };
    }
    if (profileImage) {
      const profileImagePair = { profileImage };
      stateVariables = { ...stateVariables, ...profileImagePair };
    }
    if (finalPassword[0].newPassword.length > 0) {
      this.setState({ confirmPasswordError: '' });
      const isMatch = this.handlePasswordMatch();
      if (isMatch) {
        const passwordPair = { password: finalPassword };
        stateVariables = { ...stateVariables, ...passwordPair };
      } else {
        return this.setState(
          {
            confirmPasswordError: serverError ? '' : 'confirm password does not match new password',
            isLoading: false
          }
        );
      }
    }
    return this.handleSelectiveUpdate(stateVariables);
  };

  updateUserData = () => {
    this.handlePasswordChange();
  }

  switchComponentRendering = () => {
    const { isDone, finalScreen } = this.state;
    const { classes } = this.props;

    if (isDone) {
      return (
        <UserProfileComplete
          state={this.state}
          handleManageProfileButton={this.handleManageProfileButton}
        />
      );
    } if (finalScreen) {
      return (
        <Paper className={classes.finalScreenPaper}>
          <FinalScreen />
        </Paper>
      );
    }
    return (
      <ProfileData
        state={this.state}
        handleDoneButton={this.handleDoneButton}
        handleSkipButton={this.handleSkipButton}
        handleInputChange={this.handleInputChange}
        handleArrowButtonClick={this.handleArrowButtonClick}
        onSelectFile={this.onSelectFile}
        onCropChange={this.onCropChange}
        handleClose={this.handleClose}
        handleSave={this.handleSave}
        handleClickShowPassword={this.handleClickShowPassword}
        handleClickShowPassword1={this.handleClickShowPassword1}
        handleClickShowPassword2={this.handleClickShowPassword2}
      />
    );
  }

  // Image crop handlers
  verifyUploadFile = (file) => {
    const imageMaxSize = 143360;
    const acceptedFileTypes = 'image/jpg,image/jpeg, image/JPEG, image/png, image/PNG';
    const acceptedFileTypesArray = acceptedFileTypes.split(',').map(item => item.trim());

    const currentFile = file;
    const currentFileType = currentFile.type;
    const currentFileSize = currentFile.size;

    if (currentFileSize > imageMaxSize) {
      notify(('Image size is too large. Please select aother smaller image to upload! '));
      return false;
    }
    if (!acceptedFileTypesArray.includes(currentFileType)) {
      notify((`File type ${file.type} is not allowed.`));
      return false;
    }
    return true;
  }

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const verified = this.verifyUploadFile(e.target.files[0]);
      if (verified) {
        this.setState({
          fileName: e.target.files[0].name,
          originalImageFile: e.target.files[0]
        });

        const reader = new FileReader();
        reader.addEventListener(
          'load',
          () => this.setState({ src: reader.result, open: true }),
          false
        );
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  }

  getCroppedImg = (imageFile, pixelCrop, fileName) => {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    const promise = new Promise((resolve, reject) => {
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
    }).then(() => new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg');
    }));
    return promise;
  }

  handleImageDrop = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.UPLOAD_PRESET);
    formData.append('api_key', process.env.API_KEY);
    formData.append('timestamp', (Date.now() / 1000) || 0);

    return axios.post(process.env.CLOUDINARY_URL, formData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    }).then((response) => {
      const { data } = response;
      const fileURL = data.secure_url;
      this.setState({ profileImage: fileURL, isButtonDisabled: false });
    }).catch((err) => {
      this.setState({ serverError: err });
    });
  }

  onCropChange = (crop) => {
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
      this.setState({ src: '', open: false });
    });
  }

  handleClose = () => {
    const { originalImageFile } = this.state;
    this.setState({ src: '', open: false });
    this.handleImageDrop(originalImageFile);
  }


  render() {
    return (
      <React.Fragment>
        {this.switchComponentRendering()}
      </React.Fragment>
    );
  }
}

UserProfile.propTypes = {
  userData: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  updateUser: PropTypes.func.isRequired,
};

const UPDATE_USER_INFO_QUERY = graphql(UPDATE_USER_INFO, { name: 'userData' });
const UPDATE_USER_MUTATION = graphql(UPDATE_USER, { name: 'updateUser' });


export default compose(
  UPDATE_USER_INFO_QUERY,
  UPDATE_USER_MUTATION
)(withStyles(styles)(UserProfile));

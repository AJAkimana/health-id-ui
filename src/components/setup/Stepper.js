import React from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Fab } from '@material-ui/core';
import AdminSetUp from './adminSetup';
import BusinessSetUp from './businessSetup';
import FinalScreen from './finalScreen';
import { StepperStyles } from '../../assets/css/setup';
import NavBar from '../shared/Navbar';
import Footer from '../shared/Footer';
import Loader from '../shared/Loader';
import UPDATE_ADMIN_USER from '../../mutations/adminSetupMutation';
import GET_USER_INFO from '../../queries/userDataQuery';
import CREATE_BUSSINESS from '../../mutations/businessSetupMutation';
import notify from '../shared/Toaster';

const styles = StepperStyles;

const steps = ['Admin Account', 'Business Information'];

export class StepperNav extends React.Component {
  state = {
    activeStep: 0,
    checked: false,
    isLoading: false,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    secondaryEmail: '',
    mobileNumber: '',
    secondaryPhoneNumber: '',
    legalName: '',
    tradingName: '',
    businessEmail: '',
    addressLine1: '',
    addressLine2: '',
    phoneNumber: '',
    city: '',
    country: '',
    localGovernmentArea: '',
    website: '',
    twitter: '',
    instagram: '',
    logo: '',
    facebook: '',
    serverError: '',
    formError: false,
    isError: false,
    src: '',
    crop: {
      x: 50,
      y: 50,
      width: 50,
      height: 50,
    },
    fileName: '',
    originalImageFile: '',
    croppedImage: '',
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    nextProps && this.fetchUserData(nextProps.userData);
  }

  // Stepper navigation handlers
  getStepContent = (step) => {
    switch (step) {
    case 0:
      return (
        <AdminSetUp
          state={this.state}
          handleInputChange={this.handleInPutChange}
          checked={this.toogleCheckbox}
          errorHandler={this.errorHandler}
          serverErrorHandler={this.serverErrorHandler}
        />
      );
    case 1:
      return (
        <BusinessSetUp
          state={this.state}
          handleInPutChange={this.handleInPutChange}
          checked={this.toogleCheckbox}
          handleImageDrop={this.handleImageDrop}
          errorHandler={this.errorHandler}
          serverErrorHandler={this.serverErrorHandler}
          onSelectFile={this.onSelectFile}
          onCropChange={this.onCropChange}
          handleClose={this.handleClose}
          handleSave={this.handleSave}
        />
      );

    default:
      return null;
    }
  }

  handleNextButton = () => {
    const { activeStep } = this.state;

    switch (activeStep) {
    case 0: {
      const isValidated = this.handleInputValidation();
      if (!isValidated) {
        this.setState({ formError: false });
        this.editAdminUser();
      }
    }
      break;

    case 1: {
      const isFormValid = this.handleBusinessFormInputValidation();
      if (!isFormValid) {
        this.addBusiness();
      }
    }
      break;

    default:
      break;
    }
  }

  handleBackButton = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
      checked: false,
    }));
  };

  //  Form validation handlers
  handleInputValidation = () => {
    const {
      firstName,
      lastName,
      username,
      secondaryEmail,
      secondaryPhoneNumber,
    } = this.state;
    const isInvalid = (
      !firstName || !lastName
      || !username || !secondaryEmail || !secondaryPhoneNumber
    );
    if (isInvalid) {
      this.setState({ formError: true });
    }
    return isInvalid;
  };

  handleBusinessFormInputValidation = () => {
    const {
      legalName,
      tradingName,
      phoneNumber,
      businessEmail,
      country,
      city,
      addressLine1
    } = this.state;
    const isInvalid = (!legalName || !tradingName || !phoneNumber || !businessEmail || !country || !city || !addressLine1);
    if (isInvalid) {
      this.setState({ formError: true });
    }
    return isInvalid;
  };

  errorHandler = () => {
    const { formError } = this.state;
    let errorMessage;

    if (formError) {
      errorMessage = 'Please provide a value for this field';
    } else {
      errorMessage = '';
    }
    return errorMessage;
  };

  serverErrorHandler = () => {
    const { serverError } = this.state;
    let errorMessage;

    if (serverError) {
      errorMessage = serverError;
    } else {
      errorMessage = '';
    }
    return errorMessage;
  };

  handleInPutChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // Image resize handlers
  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
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

  onCropChange = (crop) => {
    this.setState({ crop });
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
      this.setState({ logo: fileURL });
    }).catch((err) => {
      this.setState({ serverError: err });
    });
  }

  toogleCheckbox = () => {
    this.setState(state => ({
      checked: !state.checked,
    }));
  }

  // Resize dialog handlers
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

  // Apollo client request handlers
  fetchUserData = (userData) => {
    const { me, loading, error } = userData;

    if (loading) {
      return this.setState({ isLoading: loading });
    }
    if (error) {
      return this.setState({ serverError: error.message.slice(14), isError: true });
    }

    const { mobileNumber, email } = me;
    return this.setState({ mobileNumber, email });
  }

  editAdminUser = () => {
    this.setState({ isLoading: true });
    const {
      firstName,
      lastName,
      username,
      secondaryEmail,
      secondaryPhoneNumber,
      activeStep
    } = this.state;

    const { editAdmin } = this.props;

    editAdmin({
      variables: {
        firstName,
        lastName,
        username,
        secondaryEmail,
        secondaryPhoneNumber
      }
    }).then((results) => {
      notify(results.data.updateAdminUser.success);
      this.setState({ isLoading: false, activeStep: activeStep + 1, checked: false });
    }).catch((error) => {
      notify(error.message);
      this.setState({ serverError: error.message.slice(14), isLoading: false, isError: true });
    });
  }

  addBusiness = () => {
    this.setState({ isLoading: true });
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
      activeStep,
    } = this.state;

    const { createBusiness } = this.props;

    createBusiness({
      variables: {
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
      }
    }).then((results) => {
      notify(results.data.createBusiness.success[0]);
      this.setState({ isLoading: false, checked: false, activeStep: activeStep + 1 });
    }).catch((error) => {
      notify(error.message.slice(15));
      this.setState({ isLoading: false, serverError: error.message.slice(14), isError: true });
    });
  }

  render() {
    const { activeStep, checked, isLoading } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        {activeStep === steps.length ? null : <NavBar /> }
        <CssBaseline />
        <main className={classes.layout}>
          {activeStep === steps.length ? (
            <Paper>
              <Paper className={classes.finalScreenPaper}>
                <FinalScreen />
              </Paper>
            </Paper>
          ) : (
            <React.Fragment>
              <Stepper
                alternativeLabel
                nonLinear
                activeStep={activeStep}
                className={classes.stepper}
              >
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel
                      classes={{ iconContainer: classes.iconContainer }}
                    >
                      {label}

                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Paper className={classes.paper}>
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBackButton}
                        className={classes.backButton}
                        variant="text"
                        id="back-button"
                      >
                        Back
                      </Button>
                    )}
                    {isLoading
                      ? (<Loader />)
                      : (
                        <Fab
                          variant="extended"
                          color="primary"
                          disabled={!checked}
                          onClick={this.handleNextButton}
                          className={classes.button}
                          id="next-button"
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Fab>
                      )
                    }
                  </div>
                </React.Fragment>
              </Paper>

            </React.Fragment>
          )}
        </main>
        {activeStep !== steps.length && <Footer /> }
      </React.Fragment>
    );
  }
}

StepperNav.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  userData: PropTypes.instanceOf(Object).isRequired,
  editAdmin: PropTypes.func.isRequired,
  createBusiness: PropTypes.func.isRequired,
};

const UPDATE_ADMIN_USER_MUTATION = graphql(UPDATE_ADMIN_USER, { name: 'editAdmin' });
const GET_USER_INFO_QUERY = graphql(GET_USER_INFO, { name: 'userData' });
const ADD_BUSINESS_MUTATION = graphql(CREATE_BUSSINESS, { name: 'createBusiness' });

export default compose(
  UPDATE_ADMIN_USER_MUTATION,
  GET_USER_INFO_QUERY,
  ADD_BUSINESS_MUTATION
)(withStyles(styles)(StepperNav));

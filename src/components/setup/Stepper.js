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
  };

  componentWillReceiveProps(nextProps) {
    nextProps && this.fetchUserData(nextProps.userData);
  }

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
        />
      );

    default:
      return null;
    }
  }

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

  handleImageDrop = (files) => {
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', process.env.UPLOAD_PRESET);
    formData.append('api_key', process.env.API_KEY);
    formData.append('timestamp', (Date.now() / 1000) || 0);

    // Make an AJAX upload request using Axios
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

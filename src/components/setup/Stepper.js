import React from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
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
import OutletSetUp from './outletSetup';
import FinalScreen from './finalScreen';
import { StepperStyles } from '../../assets/css/setup';
import NavBar from '../shared/Navbar';
import Footer from '../shared/Footer';
import Loader from '../shared/Loader';
import UPDATE_ADMIN_USER from '../../mutations/adminSetupMutation';
import GET_USER_INFO from '../../queries/userDataQuery';
import CREATE_BUSSINESS from '../../mutations/businessSetupMutation';
import notify from '../shared/Toaster';
import CREATE_OUTLET from '../../mutations/outletSetupMutation';
import GET_ALL_COUNTRIES from '../../queries/countryQuery';
import CREATE_RECEIPT_TEMP from '../../mutations/createReceiptTempMutation';
import CREATE_REGISTER from '../../mutations/createRegisterMutation';
import UPDATE_OUTLET from '../../mutations/updateOutletMutation';
import DELETE_OUTLET from '../../mutations/deleteOutletMutation';
import UPDATE_RECEIPT_TEMP from '../../mutations/updateReceiptTempMutation';
import UPDATE_REGISTER from '../../mutations/updateRegisterMutation';
import DELETE_RECEIPT_TEMPLATE from '../../mutations/deleteReceiptTempMutation';

const styles = StepperStyles;

const steps = ['Admin Account', 'Business Information', 'Add Outlet(s)'];

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
    city: 'Lagos',
    cityId: 4,
    country: 'Nigeria',
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
    businessId: 0,
    cities: [],
    countries: [],
    dateLaunched: '2019-01-01',
    outletName: '',
    outletType: 'warehouse',
    kindId: 1,
    outletsActive: false,
    outletIsLoading: false,
    unhideMainButtons: true,
    receiptOpen: false,
    amountToPay: false,
    barcode: false,
    cashier: true,
    changeDue: false,
    discountTotal: false,
    loyalty: false,
    loyaltyBalance: false,
    loyaltyEarned: false,
    outletId: NaN,
    receiptId: NaN,
    registerId: NaN,
    registerName: '',
    registerHidden: true,
    clickedOutlet: 0,
    purchaseTotal: false,
    receipt: false,
    receiptNo: false,
    subtotal: false,
    totalTax: false,
    outletSet: [],
    edittingOutlet: false,
  };

  componentWillReceiveProps(nextProps) {
    nextProps && this.fetchUserData(nextProps);
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
    case 2:
      return (
        <OutletSetUp
          state={this.state}
          handleInPutChange={this.handleInPutChange}
          errorHandler={this.errorHandler}
          handleReceiptTemplateOpen={this.handleReceiptTemplateOpen}
          handleReceiptTemplateClose={this.handleReceiptTemplateClose}
          handleTemplateOnChange={this.handleTemplateOnChange}
          handleAddOutletButton={this.handleAddOutletButton}
          handleAddNewOutletButton={this.handleAddNewOutletButton}
          toggleRegisterDisplay={this.toggleRegisterDisplay}
          handleOutletEdit={this.handleOutletEdit}
          handleOutletDelete={this.handleOutletDelete}
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
    const isInvalid = (
      !legalName
      || !tradingName
      || !phoneNumber
      || !businessEmail
      || !country
      || !city
      || !addressLine1);
    if (isInvalid) {
      this.setState({ formError: true });
    }
    return isInvalid;
  };

  handleOutletFormInputValidation = () => {
    const {
      outletName,
      addressLine1,
      city,
      country,
      phoneNumber,
      dateLaunched,
      outletType,
      registerName
    } = this.state;
    let isInvalid = (
      !outletName || !addressLine1
      || !city || !country
      || !phoneNumber || !dateLaunched
    );
    if (outletType === 'storefront') {
      isInvalid = (
        !outletName || !addressLine1
        || !city || !country || !phoneNumber
        || !dateLaunched || !registerName
      );
    }
    if (isInvalid) {
      this.setState({ formError: true });
    }
    return isInvalid;
  };

  handleRegisterValidation = () => {
    const { registerName } = this.state;
    const isInvalid = !registerName;
    if (isInvalid) {
      this.setState({ formError: true });
    }
    return isInvalid;
  }

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
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if (name === 'country') {
      this.setLocale(value);
    }
    if (name === 'city') {
      this.setCityId(value);
    }
    if (name === 'outletType') {
      this.setOutletKindId(value);
    }
  }

  setOutletKindId = (value) => {
    const warehouse = 1;
    const storefront = 2;
    if (value === 'storefront') {
      this.setState({ kindId: storefront });
    } else {
      this.setState({ kindId: warehouse });
    }
  }

  setCityId = (value) => {
    const { cities } = this.state;
    cities.map((city) => {
      if (city.name === value) {
        this.setState({ cityId: Number(city.id) });
      }
      return value;
    });
  }

  setLocale = (value) => {
    const { countries } = this.state;
    countries.map((country) => {
      if (country.name === value) {
        const randomCity = _.sample(country.citySet);
        this.setState({
          cities: country.citySet,
          city: randomCity.name,
          cityId: Number(randomCity.id)
        });
      }
      return value;
    });
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

  toggleRegisterDisplay = (event) => {
    const { clickedOutlet, registerHidden } = this.state;
    const { id } = event.target;
    if (id === clickedOutlet) {
      this.setState({
        clickedOutlet: '',
        registerHidden: true,
      });
    }
    if (id !== clickedOutlet) {
      this.setState({
        clickedOutlet: id,
        registerHidden: false,
      });
    }
  }

  handleOutletEdit = ({
    id,
    name,
    addressLine1,
    addressLine2,
    lga,
    city,
    phoneNumber,
    dateLaunched,
    kind,
    registerSet,
  }) => {
    let isStorefront;
    if (registerSet === undefined || registerSet.length === 0) {
      isStorefront = false;
    } else isStorefront = true;

    const receipt = isStorefront ? registerSet[0].receipt : '';
    this.setState({
      outletName: name,
      outletId: id,
      addressLine1,
      addressLine2,
      localGovernmentArea: lga,
      city: city.name,
      country: city.country.name,
      phoneNumber,
      dateLaunched,
      outletType: kind.name,
      registerName: isStorefront ? registerSet[0].name : '',
      registerId: isStorefront ? registerSet[0].id : '',
      receiptId: isStorefront ? receipt.id : '',
      amountToPay: isStorefront ? receipt.amountToPay : '',
      barcode: isStorefront ? receipt.barcode : '',
      cashier: isStorefront ? receipt.cashier : '',
      changeDue: isStorefront ? receipt.changeDue : '',
      discountTotal: isStorefront ? receipt.discountTotal : '',
      loyalty: isStorefront ? receipt.loyalty : '',
      loyaltyBalance: isStorefront ? receipt.loyaltyBalance : '',
      loyaltyEarned: isStorefront ? receipt.loyaltyEarned : '',
      purchaseTotal: isStorefront ? receipt.purchaseTotal : '',
      receipt: isStorefront ? receipt.receipt : '',
      receiptNo: isStorefront ? receipt.receiptNo : '',
      subtotal: isStorefront ? receipt.subtotal : '',
      totalTax: isStorefront ? receipt.totalTax : '',
      edittingOutlet: true,
      outletsActive: false,
      unhideMainButtons: false,
    });
  }

  handleOutletDelete = ({ id }) => {
    this.removeOutlet(id);
  }

  addReceiptTemplate = () => {
    const { edittingOutlet, receiptId } = this.state;
    const isValidated = this.handleRegisterValidation();
    if (!isValidated) {
      this.setState({ formError: false });
      if (edittingOutlet && receiptId) this.EditReceiptTemplate();
      else this.createReceiptTemplate();
    }
  }

  addRegister = () => {
    this.createRegister();
  }

  handleAddOutletButton = () => {
    const { edittingOutlet } = this.state;
    const isValidated = this.handleOutletFormInputValidation();
    if (!isValidated) {
      this.setState({
        formError: false,
        checked: false
      });
      if (edittingOutlet) this.handleEditOutlet();
      else this.addOutlet();
    }
  }

  handleEditOutlet = () => {
    const { outletType, receiptId } = this.state;
    if (outletType === 'warehouse' && receiptId) {
      this.removeReceiptTemplate();
    } else this.editOutlet();
  }

  handleAddNewOutletButton = async () => {
    await this.setState({
      outletsActive: false,
      unhideMainButtons: false,
      outletId: NaN,
      outletName: '',
      addressLine1: '',
      phoneNumber: '',
    });
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

    case 2: {
      const finishOutlet = this.finishAddOutlet();
    }
      break;

    default:
      break;
    }
  }

  handleClose = () => {
    const { originalImageFile } = this.state;
    this.setState({ src: '', open: false });
    this.handleImageDrop(originalImageFile);
  }

  handleReceiptTemplateOpen = () => {
    this.setState({ receiptOpen: true });
  }

  handleReceiptTemplateClose = () => {
    this.setState({ receiptOpen: false });
  }

  handleTemplateOnChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  }

  fetchUserData = (nextProps) => {
    const {
      userData: { me, loading, error },
      countriesData: { countries },
    } = nextProps;

    if (loading) {
      return this.setState({ isLoading: false });
    }
    if (error) {
      return this.setState({ serverError: error.message.slice(14), isError: true });
    }
    const { mobileNumber, email } = me;
    let cities = [];
    countries && countries.map((country) => {
      if (country.name === 'Nigeria') {
        cities = country.citySet;
      }
    });
    return this.setState({
      mobileNumber, email, cities, countries
    });
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
      this.setState({
        isLoading: false,
        checked: false,
        activeStep: activeStep + 1,
        unhideMainButtons: false,
        outletsActive: false,
        businessId: results.data.createBusiness.business.id
      });
    }).catch((error) => {
      notify(error.message.slice(15));
      this.setState({ isLoading: false, serverError: error.message.slice(14), isError: true });
    });
  }

  addOutlet = () => {
    this.setState({ outletIsLoading: true });
    const {
      outletName,
      addressLine1,
      addressLine2,
      localGovernmentArea,
      businessId,
      cityId,
      dateLaunched,
      kindId,
      phoneNumber,
      outletType,
    } = this.state;

    const { createOutlet } = this.props;
    createOutlet({
      variables: {
        outletName,
        addressLine1,
        addressLine2,
        localGovernmentArea,
        businessId,
        cityId,
        dateLaunched,
        kindId,
        phoneNumber
      }
    }).then((results) => {
      notify(results.data.createOutlet.success);
      const id = Number(results.data.createOutlet.outlet.id);
      this.setState({
        outletId: id,
      });
      this.toogleCheckbox();
      if (outletType === 'storefront') {
        this.addReceiptTemplate();
      }
      return results;
    }).then((results) => {
      if (outletType === 'warehouse') {
        const { outlet } = results.data.createOutlet;
        this.setState(state => ({
          outletSet: [...state.outletSet, outlet],
          outletIsLoading: false,
          unhideMainButtons: true,
          outletsActive: true,
        }));
      }
    }).catch((error) => {
      notify('Something went wrong, Please check your inputs');
      this.setState({
        outletIsLoading: false,
        serverError: error.message.slice(14),
        sError: true
      });
    });
  }

  createReceiptTemplate = () => {
    const {
      amountToPay,
      barcode,
      cashier,
      changeDue,
      discountTotal,
      loyalty,
      loyaltyBalance,
      loyaltyEarned,
      purchaseTotal,
      receipt,
      receiptNo,
      subtotal,
      totalTax,
      receiptOpen,
      outletId,
    } = this.state;
    const { createReceiptTemplate } = this.props;
    createReceiptTemplate({
      variables: {
        amountToPay,
        barcode,
        cashier,
        changeDue,
        discountTotal,
        loyalty,
        loyaltyBalance,
        loyaltyEarned,
        purchaseTotal,
        receipt,
        receiptNo,
        subtotal,
        totalTax,
        receiptOpen,
        outletId,
      }
    }).then((results) => {
      const { id } = results.data.createReceiptTemplate.receiptTemplate;
      this.setState({ receiptId: id });
      this.addRegister();
    }).catch((error) => {
      notify('Something went wrong, Please check your inputs');
      this.setState({
        outletIsLoading: false,
        serverError: error.message.slice(14),
        sError: true
      });
    });
  }

  createRegister = () => {
    const {
      registerName,
      outletId,
      receiptId,
      outletSet,
    } = this.state;
    const { createRegister } = this.props;
    createRegister({
      variables: {
        registerName,
        outletId,
        receiptId,
      }
    }).then((results) => {
      const { outlet } = results.data.createRegister.register;
      const newOutletSet = outletSet.filter(
        item => item.id !== outlet.id
      );
      this.setState({
        outletSet: [...newOutletSet, outlet],
        outletIsLoading: false,
        unhideMainButtons: true,
        outletsActive: true,
      });
    }).catch((error) => {
      notify(error.message);
      this.setState({
        outletIsLoading: false,
      });
    });
  }

  editOutlet = () => {
    this.setState({ outletIsLoading: true });
    const {
      outletId,
      outletName,
      addressLine1,
      addressLine2,
      localGovernmentArea,
      cityId,
      phoneNumber,
      dateLaunched,
      kindId,
      outletType,
      outletSet,
    } = this.state;
    const { updateOutlet } = this.props;
    updateOutlet({
      variables: {
        outletId,
        outletName,
        addressLine1,
        addressLine2,
        localGovernmentArea,
        cityId,
        phoneNumber,
        dateLaunched,
        kindId,
      }
    }).then((results) => {
      notify(results.data.updateOutlet.success);
      this.toogleCheckbox();
      if (outletType === 'storefront') {
        this.addReceiptTemplate();
      }
      return results;
    }).then((results) => {
      if (outletType === 'warehouse') {
        const { outlet } = results.data.updateOutlet;
        const newOutletSet = outletSet.filter(
          item => item.id !== outlet.id
        );
        this.setState({
          outletSet: [...newOutletSet, outlet],
          outletIsLoading: false,
          outletsActive: true,
          unhideMainButtons: true,
          edittingOutlet: false,
        });
      }
    }).catch((error) => {
      notify(error.message);
      this.setState({
        outletIsLoading: false,
        serverError: error.message.slice(14),
        sError: true
      });
    });
  }

  EditReceiptTemplate = () => {
    const {
      receiptId,
      amountToPay,
      barcode,
      cashier,
      changeDue,
      discountTotal,
      loyalty,
      loyaltyBalance,
      loyaltyEarned,
      purchaseTotal,
      receipt,
      receiptNo,
      subtotal,
      totalTax,
      receiptOpen,
      outletId,
    } = this.state;
    const { updateReceiptTemplate } = this.props;
    updateReceiptTemplate({
      variables: {
        receiptId,
        amountToPay,
        barcode,
        cashier,
        changeDue,
        discountTotal,
        loyalty,
        loyaltyBalance,
        loyaltyEarned,
        purchaseTotal,
        receipt,
        receiptNo,
        subtotal,
        totalTax,
        receiptOpen,
        outletId,
      }
    }).then((results) => {
      const { id } = results.data.updateReceiptTemplate.receiptTemplate;
      this.editRegister();
    }).catch((error) => {
      notify('Something went wrong, Please check your inputs');
      this.setState({
        outletIsLoading: false,
        serverError: error.message.slice(14),
        sError: true
      });
    });
  }

  editRegister = () => {
    const {
      registerId,
      registerName,
      outletSet,
    } = this.state;
    const registerIdInt = Number(registerId);
    const { updateRegister } = this.props;
    updateRegister({
      variables: {
        registerIdInt,
        registerName,
      }
    }).then((results) => {
      const { outlet } = results.data.updateRegister.register;
      const newOutletSet = outletSet.filter(
        item => item.id !== outlet.id
      );
      this.setState({
        outletSet: [...newOutletSet, outlet],
        outletIsLoading: false,
        outletsActive: true,
        unhideMainButtons: true,
        edittingOutlet: false,
      });
    }).catch((error) => {
      notify(error.message);
      this.setState({
        outletIsLoading: false,
      });
    });
  }

  removeOutlet = (id) => {
    const { outletSet } = this.state;
    const { deleteOutlet } = this.props;
    deleteOutlet({
      variables: { id }
    }).then((results) => {
      notify(results.data.deleteOutlet.success);
      const outlets = outletSet.filter(outlet => outlet.id !== id);
      this.setState({ outletSet: outlets });
    }).catch((error) => {
      notify(error.message);
    });
  }

  removeReceiptTemplate = () => {
    const { receiptId } = this.state;
    const { deleteReceipt } = this.props;
    deleteReceipt({
      variables: { receiptId }
    }).then((results) => {
      this.editOutlet();
      return results;
    }).catch((error) => {
      notify(error.message);
    });
  }

  finishAddOutlet = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep + 1 });
  }

  render() {
    const {
      activeStep, checked, isLoading, unhideMainButtons
    } = this.state;
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
                    {activeStep !== 0 && unhideMainButtons && (
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
                        unhideMainButtons && (
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
  countriesData: PropTypes.instanceOf(Object).isRequired,
  createOutlet: PropTypes.instanceOf(Object).isRequired,
  createReceiptTemplate: PropTypes.instanceOf(Object).isRequired,
  createRegister: PropTypes.instanceOf(Object).isRequired,
  deleteOutlet: PropTypes.instanceOf(Object).isRequired,
  updateOutlet: PropTypes.instanceOf(Object).isRequired,
  updateReceiptTemplate: PropTypes.instanceOf(Object).isRequired,
  deleteReceipt: PropTypes.instanceOf(Object).isRequired,
  updateRegister: PropTypes.instanceOf(Object).isRequired,
  editAdmin: PropTypes.func.isRequired,
  createBusiness: PropTypes.func.isRequired,
};

const UPDATE_ADMIN_USER_MUTATION = graphql(UPDATE_ADMIN_USER, { name: 'editAdmin' });
const GET_USER_INFO_QUERY = graphql(GET_USER_INFO, { name: 'userData' });
const GET_COUNTRIES_QUERY = graphql(GET_ALL_COUNTRIES, { name: 'countriesData' });
const ADD_BUSINESS_MUTATION = graphql(CREATE_BUSSINESS, { name: 'createBusiness' });
const ADD_OUTLET_MUTATION = graphql(CREATE_OUTLET, { name: 'createOutlet' });
const ADD_RECEIPT_TEMP_MUTATION = graphql(CREATE_RECEIPT_TEMP, { name: 'createReceiptTemplate' });
const ADD_REGISTER_MUTATION = graphql(CREATE_REGISTER, { name: 'createRegister' });
const UPDATE_OUTLET_MUTATION = graphql(UPDATE_OUTLET, { name: 'updateOutlet' });
const DELETE_OUTLET_MUTATION = graphql(DELETE_OUTLET, { name: 'deleteOutlet' });
const UPDATE_RECEIPT_TEMP_MUTATION = graphql(UPDATE_RECEIPT_TEMP, { name: 'updateReceiptTemplate' });
const UPDATE_REGISTER_MUTATION = graphql(UPDATE_REGISTER, { name: 'updateRegister' });
const DELETE_RECEIPT_TEMP_MUTATION = graphql(DELETE_RECEIPT_TEMPLATE, { name: 'deleteReceipt' });

export default compose(
  UPDATE_ADMIN_USER_MUTATION,
  GET_USER_INFO_QUERY,
  GET_COUNTRIES_QUERY,
  ADD_BUSINESS_MUTATION,
  ADD_OUTLET_MUTATION,
  ADD_RECEIPT_TEMP_MUTATION,
  ADD_REGISTER_MUTATION,
  UPDATE_OUTLET_MUTATION,
  DELETE_OUTLET_MUTATION,
  UPDATE_RECEIPT_TEMP_MUTATION,
  UPDATE_REGISTER_MUTATION,
  DELETE_RECEIPT_TEMP_MUTATION,
)(withStyles(styles)(StepperNav));

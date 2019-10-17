/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-vars */
import React, { Component, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { compose, graphql, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import {
  validateEmail, validatePhone, validateName, validateComment
} from '../../utils/validations';
import SupplierForm from './SupplierForm';
import withAuth from '../../withAuth';
import GET_INITIAL_DATA from '../../../queries/countryQuery';
import CREATE_SUPPLIER from '../../../mutations/createSupplier';
import Dashboard from '../../shared/Dashboard/Dashboard';
import BackAction from '../../shared/BackAction';
import notify from '../../shared/Toaster';
import verifyFile from '../../../utils/products/verifyFile';
import FormLoader from '../../shared/Loader/FormLoader';


export class AddSupplier extends Component {
  state = {
    name: '',
    nameError: '',
    nameHelperText: '',
    email: '',
    emailError: false,
    emailHelperText: '',
    comment: '',
    commentError: '',
    commentHelperText: '',
    lineError: '',
    lineHelperText: '',
    mobileNumber: '',
    mobileNumberError: false,
    mobileHelperText: '',
    addressLine1: '',
    addressLine2: '',
    lga: '',
    commentary: '',
    countryValue: '',
    cities: '',
    cityValue: '',
    cityId: '',
    tierId: '',
    logo: '',
    paymentTermsId: '1',
    creditDays: 45,
    loading: false,
    imageFile: '',
    fileName: '',
    src: null,
    crop: {
      aspect: 1 / 1
    },
    open: false,
    isDisabled: true,
    colorHasChanged: false,
    colorHasChangedCity: false
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if (value === '1') {
      this.setState({ isDisabled: true });
      this.setState({ paymentTermsId: '1' });
    } else {
      this.setState({ isDisabled: false });
      this.setState({ paymentTermsId: '2' });
    }
  };

  handleSliderChange = (event) => {
    this.setState({ creditDays: event });
  }

  handleNameChange = (event) => {
    const { name, value } = event.target;
    const isValid = validateName(value);
    const [helperText, error] = isValid;
    this.setState({
      [name]: value,
      nameError: error,
      nameHelperText: helperText
    });
  };

  handleCommentChange = (event) => {
    const { value } = event.target;

    const isValid = validateComment(value);
    const [helperText, error] = isValid;
    this.setState({
      commentary: value,
      commentError: error,
      commentHelperText: helperText
    });
  };

  handleLineChange=(event) => {
    const { name, value } = event.target;

    const isValid = validateName(value);
    const [helperText, error] = isValid;
    this.setState({
      [name]: value,
      lineError: error,
      lineHelperText: helperText
    });
  }


  handleCountryChange = (event) => {
    const { label, value, citySet } = event;
    this.setState({
      colorHasChanged: true,
      countryValue: { label, value },
      cities: citySet,
      cityValue: {
        label: citySet[0].name,
        value: citySet[0].name
      },
      cityId: citySet[0].id
    });
  };

  handleCityChange = (event) => {
    const { label, value, id } = event;
    this.setState({
      cityValue: { label, value },
      cityId: id
    });
  };

  handlePaymentTermsChange = (event) => {
    const { value } = event.target;
    this.setState({ paymentTermsId: value });
  };

  handleMobileChange = (value) => {
    const isValid = validatePhone(value);
    const [helperText, error] = isValid;
    this.setState({
      mobileNumber: value,
      mobileNumberError: error,
      mobileHelperText: helperText
    });
  };

  handleEmailChange = (event) => {
    const { value } = event.target;
    const isValid = validateEmail(value);
    const [helperText, error] = isValid;
    this.setState({
      email: value,
      emailError: error,
      emailHelperText: helperText
    });
  };

  handleColorChange = (event) => {
    this.setState({ colorHasChanged: true });
  }

  handleColorChangeCity = (event) => {
    this.setState({ colorHasChangedCity: true });
  }


  handleTierChange = (event) => {
    const { value } = event.target;
    this.setState({ tierId: value });
  };

  handleProposeSupplier = (btnClicked) => {
    const { addSupplier } = this.props;
    const {
      name,
      cityId,
      email,
      mobileNumber,
      addressLine1,
      addressLine2,
      lga,
      paymentTermsId,
      commentary,
      tierId,
      creditDays,
      logo
    } = this.state;
    const paymentsTermsId = parseInt(paymentTermsId, 10);
    const citId = parseInt(cityId, 10);
    this.setState({ loading: true });
    addSupplier({
      variables: {
        name,
        email,
        mobileNumber,
        addressLine1,
        addressLine2,
        lga,
        paymentsTermsId,
        commentary,
        citId,
        tierId,
        creditDays,
        logo: logo || 'none'
      }
    })
      .then((res) => {
        const { history, refetch } = this.props;
        const { addSupplier: addedSupplier = {} } = res.data;
        const { name: supplierName = {}, supplierId } = addedSupplier.supplier;
        notify(`${supplierName} with id ${supplierId} has been added and sent for approval`);

        if (btnClicked === 'save') {
          history.push('/suppliers');
          refetch();
        }
      })
      .catch((err) => {
        const { message } = err.graphQLErrors[0];
        notify(message);
      });
  }

  handleSendForApproval = async (e) => {
    const btnClicked = e.currentTarget.id;
    await this.handleProposeSupplier(btnClicked);
  }

  handleAddAnotherSupplier = async (e) => {
    const btnClicked = e.currentTarget.id;
    await this.handleProposeSupplier(btnClicked);
    setTimeout(() => {
      this.setState({
        name: '',
        email: '',
        mobileNumber: '',
        addressLine1: '',
        addressLine2: '',
        lga: '',
        commentary: '',
        cityId: '',
        countryValue: '',
        cities: '',
        tierId: '',
        logo: '',
        paymentTermsId: '1',
        creditDays: '',
        loading: false,
        imageFile: '',
        fileName: '',
        src: null,
        crop: {
          aspect: 1 / 1
        },
        open: false,
      });
    }, 1500);
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

   handleImageDrop = (file) => {
     const formData = new FormData();
     formData.append('file', file);
     formData.append('upload_preset', process.env.UPLOAD_PRESET);
     formData.append('api_key', `${process.env.API_KEY}`);
     formData.append('timestamp', (Date.now() / 1000) || 0);
     return axios({
       url: process.env.CLOUDINARY_URL,
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       data: formData
     }).then((response) => {
       const { data } = response;
       const fileURL = data.secure_url;
       this.setState({
         logo: fileURL
       });
       notify('Image uploaded successfully');
     }).catch((err) => {
       notify('There was an error uploading the image', err);
     });
   }

   handleDragOverImage = (acceptedFiles) => {
     const reader = new FileReader();
     reader.addEventListener('load', () => {
       const binaryStr = reader.result;
       this.setState({ imageFile: acceptedFiles, src: binaryStr, open: true });
     }, false);

     acceptedFiles.forEach(file => reader.readAsDataURL(file));
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
    const { src } = this.state;
    this.setState({
      src: '',
      open: false
    });
    this.handleImageDrop(src);
  }


  handleOnCropChange = (crop) => {
    this.setState({ crop });
  }

  render() {
    const { session } = this.props;

    return (
      <div>
        <Dashboard isActive="grid4" session={session} />
        <Query
          query={GET_INITIAL_DATA}
          variables={{ outletId: localStorage.outletId }}
        >
          {({ loading, error, data }) => (loading && <FormLoader />) || (error && <p>Error</p>) || (
            <div>
              <BackAction
                header="Add Supplier"
                link="/suppliers"
              />
              <SupplierForm
                state={this.state}
                initialData={data}
                handleChange={this.handleChange}
                handleNameChange={this.handleNameChange}
                handleCommentChange={this.handleCommentChange}
                handleLineChange={this.handleLineChange}
                onSelectFile={this.onSelectFile}
                handleOnDrop={this.handleImageDrop}
                handleOnCropChange={this.handleOnCropChange}
                handleTierChange={this.handleTierChange}
                handleCountryChange={this.handleCountryChange}
                handleCityChange={this.handleCityChange}
                handleClose={this.handleClose}
                handleSave={this.handleSave}
                handleSendForApproval={this.handleSendForApproval}
                handleAddAnotherSupplier={this.handleAddAnotherSupplier}
                handlePaymentTermsChange={this.handlePaymentTermsChange}
                handleMobileChange={this.handleMobileChange}
                handleEmailChange={this.handleEmailChange}
                handleColorChange={this.handleColorChange}
                handleColorChangeCity={this.handleColorChangeCity}
                handleSliderChange={this.handleSliderChange}
                handleDragImage={this.handleDragOverImage}
              />
            </div>
          )}
        </Query>
      </div>
    );
  }
}

AddSupplier.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  history: PropTypes.objectOf(PropTypes.any),
  addSupplier: PropTypes.func.isRequired,
  refetch: PropTypes.func,
};

AddSupplier.defaultProps = {
  session: {},
  history: {},
  refetch: () => {}
};

const ADD_SUPPLIER = graphql(CREATE_SUPPLIER, { name: 'addSupplier' });

export default withAuth((compose(
  ADD_SUPPLIER
)(withRouter(AddSupplier))));

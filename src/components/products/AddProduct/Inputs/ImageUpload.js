import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import ResizeDialog from '../../../profile/resizeDialogBox';
import { ImageUploadStyles } from '../../../../assets/styles/products/addProductStyles';
import ProductImagePlaceholder from '../../../../assets/images/productImage.png';

const ImageUpload = (props) => {
  const {
    state,
    profileImage,
    handleOnDrop,
    handleOnCropChange,
    handleClose,
    handleSave,
    onSelectFile
  } = props;

  return (
    <div style={ImageUploadStyles.container}>
      {state.src ? (
        <ResizeDialog
          state={state}
          onCropChange={handleOnCropChange}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      ) : (
        <div>
          <div style={ImageUploadStyles.uploadDiv}>
            {state.productImage || profileImage ? (
              <img
                src={state.productImage || profileImage}
                className="product-image"
                alt="product"
                style={ImageUploadStyles.uploadedImg}
              />
            ) : (
              <img
                src={ProductImagePlaceholder}
                className="imgPlaceholder"
                alt="product"
                style={ImageUploadStyles.imgPlaceholder}
              />
            )}
          </div>
          <p style={ImageUploadStyles.label}>Upload png / jpg</p>
          <Dropzone
            onDrop={handleOnDrop}
            accept="image/jpg, image/jpeg, image/JPEG, image/png, image/PNG"
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <div>
                <input {...getInputProps()} onChange={onSelectFile} />
                <Button {...getRootProps()} variant="contained" style={ImageUploadStyles.button}>
                  Choose image
                </Button>
              </div>
            )}
          </Dropzone>
        </div>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  profileImage: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOnCropChange: PropTypes.func.isRequired,
  handleOnDrop: PropTypes.func.isRequired,
  onSelectFile: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default ImageUpload;

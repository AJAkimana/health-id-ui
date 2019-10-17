/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prefer-const */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import ResizeDialog from '../../../profile/resizeDialogBox';
import { ImageUploadStyles } from '../../../../assets/styles/suppliers/addSupplierStyles';
import SupplierImagePlaceholder from '../../../../assets/images/uploadIcon.png';

const ImageUpload = (props) => {
  const {
    state,
    handleOnCropChange,
    handleClose,
    handleSave,
    onSelectFile,
    dragImage
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
          <Dropzone
            onDrop={acceptedFiles => dragImage(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div>
                <input {...getInputProps()} onChange={onSelectFile} />
                <div {...getRootProps()} style={ImageUploadStyles.uploadDiv}>
                  {state.logo ? (
                    <img
                      src={state.logo}
                      className="logo"
                      alt="brand logo"
                      style={ImageUploadStyles.uploadedImg}
                    />
                  ) : (
                    <Fragment {...getRootProps()}>
                      <img
                        src={SupplierImagePlaceholder}
                        className="imgPlaceholder"
                        alt="brand logo"
                        style={ImageUploadStyles.imgPlaceholder}
                      />
                      <p style={ImageUploadStyles.label}>
                          Drag and drop png / jpg
                        <br />
                          or
                      </p>
                    </Fragment>
                  )}
                </div>
                <Button {...getRootProps()} variant="contained" style={ImageUploadStyles.button}>
                  {state.logo ? 'Change File' : 'Choose Image'}
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
  handleClose: PropTypes.func.isRequired,
  handleOnCropChange: PropTypes.func.isRequired,
  onSelectFile: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  dragImage: PropTypes.func.isRequired
};

export default ImageUpload;

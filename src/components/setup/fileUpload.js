import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import Tooltip from '@material-ui/core/Tooltip';
import 'react-image-crop/dist/ReactCrop.css';
import CloudUpload from '@material-ui/icons/CloudUpload';
import { FileUploadStyles } from '../../assets/styles/setup';
import ResizeDialog from './resizeDialogBox';

const FileUpload = (props) => {
  const {
    logo,
    state,
    onSelectFile,
    onCropChange,
    handleClose,
    handleSave,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const onDrop = useCallback((acceptedFiles) => {
  }, []);

  return (
    <div style={FileUploadStyles.root}>
      { state.src ? (
        <ResizeDialog
          state={state}
          onCropChange={onCropChange}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      ) : (
        <Dropzone
          onDrop={onDrop}
          multiple={false}
          accept="image/jpg,image/jpeg, image/JPEG, image/png, image/PNG"
        >
          {({
            getRootProps, getInputProps, isDragActive, isDragReject
          }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} onChange={onSelectFile} />
              {isDragActive && !isDragReject && "Drop it like it's hot!"}
              {isDragReject && 'File type not accepted, sorry!'}

              {

                logo ? (
                  <img src={logo} alt="logo" style={FileUploadStyles.previewImage} />

                )
                  : (
                    <div>
                      <CloudUpload style={FileUploadStyles.image} />
                      <p>Drag and drop a logo</p>
                      <p>or</p>
                      <Tooltip title="Only images not more than 500 * 500px are supported">
                        <Button variant="text">
                    Click / Tap to Choose file
                        </Button>
                      </Tooltip>
                    </div>
                  )
              }
            </div>
          )}
        </Dropzone>
      )
      }
    </div>
  );
};

FileUpload.propTypes = {
  logo: PropTypes.string.isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
  onSelectFile: PropTypes.func.isRequired,
  onCropChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};
export default FileUpload;

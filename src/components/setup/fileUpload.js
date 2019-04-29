import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import CloudUpload from '@material-ui/icons/CloudUpload';
import { FileUploadStyles } from '../../assets/css/setup';

const FileUpload = ({ handleImageDrop, logo }) => {
  const onDrop = useCallback((acceptedFiles) => {
    handleImageDrop(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={FileUploadStyles.root}>
      <input {...getInputProps()} />
      {
        logo ? (
          <img src={logo} alt="logo" style={FileUploadStyles.previewImage} />
        )
          : (
            <div>
              <CloudUpload style={FileUploadStyles.image} />
              <p>Drag and drop a logo</p>
              <p>or</p>
              <p>Click / Tap to Choose file</p>
            </div>
          )
      }
    </div>
  );
};

FileUpload.propTypes = {
  handleImageDrop: PropTypes.func.isRequired,
  logo: PropTypes.string.isRequired,
};
export default FileUpload;

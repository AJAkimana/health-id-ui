import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import '../../assets/styles/shared/uploadFile/DragFile.scss';
import UploadImage from '../../assets/images/uploadIcon.png';
import DragFileStyles from '../../assets/styles/shared/uploadFile/uploadFile';

const UploadFileComponent = (props) => {
  const { onDrop, handleFile } = props;
  return (
    <div className="wrapper">
      <div />
      <div>
        <Dropzone
          accept="text/csv"
          multiple={false}
          minSize={0}
          maxSize={5242880}
          onDrop={onDrop}
        >
          {({
            getRootProps, getInputProps, isDragActive, isDragReject
          }) => (
            <div className="file-section">
              <input {...getInputProps()} onChange={handleFile} />
              <img {...getRootProps()} src={UploadImage} className="uploadImg" alt="dropzone" />
              {!isDragActive && <h3 className="text">Drag and drop .csv</h3>}
              {isDragReject && <h3 className="text">File type not accepted</h3>}
              <span className="span">or</span>
              <Button
                {...getRootProps()}
                style={DragFileStyles.fileButton}
              >
                  Choose file
              </Button>
            </div>
          )}
        </Dropzone>
      </div>
      <div />
    </div>
  );
};

UploadFileComponent.propTypes = {
  onDrop: PropTypes.func.isRequired,
  handleFile: PropTypes.func.isRequired
};

export default UploadFileComponent;

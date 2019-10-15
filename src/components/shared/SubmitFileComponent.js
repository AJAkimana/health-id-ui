import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@material-ui/core';
import '../../assets/styles/shared/submitFile/SubmitFile.scss';
import SubmitFileStyles from '../../assets/styles/shared/submitFile/submitFile';


const SubmitFile = (props) => {
  const {
    file, handleUpload, loading, serverResponse, isSubmitFileFailed, handleUploadFailed
  } = props;

  return (
    <div className="container">
      <div className="file-item">
        <h3 className="file-text">
          <span className="file-name">
            &apos;
            {file.name}
            &apos;
          </span>
            &nbsp;is ready to upload
        </h3>
        {serverResponse ? (
          <span className="file-span">
            {serverResponse}
          </span>
        ) : ''}
        <div className="file-submit">
          {loading ? (<CircularProgress color="secondary" className="loader" />)
            : (
              <Button
                className="file-submit-btn"
                color="secondary"
                variant="contained"
                style={SubmitFileStyles.submitButton}
                onClick={isSubmitFileFailed ? handleUploadFailed : handleUpload}
              >
                {
                  isSubmitFileFailed ? 'Choose new file' : 'Submit'
                }
              </Button>
            )}
        </div>
      </div>
    </div>
  );
};

SubmitFile.propTypes = {
  file: PropTypes.instanceOf(Object).isRequired,
  handleUpload: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  serverResponse: PropTypes.string.isRequired,
  isSubmitFileFailed: PropTypes.bool.isRequired,
  handleUploadFailed: PropTypes.func.isRequired,
};

export default SubmitFile;

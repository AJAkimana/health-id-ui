import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, Button
} from '@material-ui/core';
import UploadFileComponent from '../../../shared/UploadFileComponent';
import { ImportProductStyles } from '../../../../assets/styles/products/ImportProductStyles';
import SubmitFile from '../../../shared/SubmitFileComponent';
import FieldsTable from './FieldsTable';
import Separator from '../../../shared/Separator';


const ImportSuppliersForm = (props) => {
  const {
    state: {
      file, loading, serverResponse
    },
    onDrop,
    handleFile,
    handleUpload,
    handleDownloadTemplate,
    fileLoaded,
    isSubmitFileFailed,
    handleUploadFailed
  } = props;

  const disableDownload = !!file;

  const ButtonStyle = file ? ImportProductStyles.disabledBtn : ImportProductStyles.templateBtn;

  return (
    <Fragment>
      <Paper
        style={ImportProductStyles.paper}
      >
        <Grid
          container
          spacing={24}
          style={ImportProductStyles.importContainer}
        >
          <Grid
            item
            xs={12}
            style={ImportProductStyles.textSection}
          >
            <div>
              Import Supplier CSV
            </div>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <hr style={ImportProductStyles.horizontalLine} />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <div style={ImportProductStyles.templateDiv}>
              Download sample template to import suppliers
            </div>
            <div style={ImportProductStyles.templateDivBtn}>
              <Button
                style={ButtonStyle}
                disabled={disableDownload}
                onClick={handleDownloadTemplate}
              >
                DOWNLOAD SAMPLE TEMPLATE
              </Button>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Separator />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <FieldsTable />
          </Grid>
        </Grid>
      </Paper>
      {!fileLoaded ? (
        <UploadFileComponent
          onDrop={onDrop}
          handleFile={handleFile}
        />
      ) : (
        <SubmitFile
          file={file}
          loading={loading}
          handleUpload={handleUpload}
          serverResponse={serverResponse}
          isSubmitFileFailed={isSubmitFileFailed}
          handleUploadFailed={handleUploadFailed}
        />
      )
      }
    </Fragment>
  );
};

ImportSuppliersForm.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  fileLoaded: PropTypes.bool.isRequired,
  onDrop: PropTypes.func,
  handleFile: PropTypes.func,
  handleUpload: PropTypes.func,
  handleDownloadTemplate: PropTypes.func,
  serverResponse: PropTypes.func,
  isSubmitFileFailed: PropTypes.bool.isRequired,
  handleUploadFailed: PropTypes.func.isRequired,
};

ImportSuppliersForm.defaultProps = {
  onDrop: () => {},
  handleFile: () => {},
  handleUpload: () => {},
  handleDownloadTemplate: () => {},
  serverResponse: () => {}
};


export default ImportSuppliersForm;

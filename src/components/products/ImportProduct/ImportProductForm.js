import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, Typography, Button
} from '@material-ui/core';
import UploadFileComponent from './UploadFileComponent';
import { ImportProductStyles } from '../../../assets/styles/products/ImportProductStyles';
import SubmitFile from './SubmitFileComponent';
import FieldsTable from './FieldsTable';
import Separator from './Separator';


const ImportProductForm = (props) => {
  const {
    state: {
      file, loading, serverResponse
    }, onDrop, handleFile, handleUpload, handleDownloadTemplate
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
            <Typography
              style={ImportProductStyles.typography}
            >
              Upload Manager
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
          >
            <FieldsTable />
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
            <div style={ImportProductStyles.templateDiv}>
              <Button
                style={ButtonStyle}
                disabled={disableDownload}
                onClick={handleDownloadTemplate}
              >
                DOWNLOAD SAMPLE TEMPLATE
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
      {!file ? (
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
        />
      )
      }
    </Fragment>
  );
};

ImportProductForm.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  onDrop: PropTypes.func.isRequired,
  handleFile: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  handleDownloadTemplate: PropTypes.func.isRequired,
};


export default ImportProductForm;

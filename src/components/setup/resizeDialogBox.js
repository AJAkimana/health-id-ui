import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { DialogContent } from '@material-ui/core';
import ReactCrop from 'react-image-crop';
import { dialogButtonStyles } from '../../assets/styles/setup';

const ResizeDialog = (props) => {
  const {
    state,
    onCropChange,
    handleClose,
    handleSave,
  } = props;
  return (
    <div>
      <Dialog
        open={state.open}
      >
        <DialogTitle id="responsive-dialog-title">
        Drag the edges of the highlighted box to resize your image!
        </DialogTitle>
        <DialogContent>
          <ReactCrop
            src={state.src}
            crop={state.crop}
            onChange={onCropChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSave}
            variant="contained"
            autoFocus
            color="secondary"
            style={dialogButtonStyles}
          >
              Save
          </Button>
          <Button
            onClick={handleClose}
            variant="text"
          >
              Skip
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ResizeDialog.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  onCropChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default withMobileDialog()(ResizeDialog);

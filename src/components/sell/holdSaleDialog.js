import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, Slide, TextField, Grid, Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Loader from '../shared/Loader';
import { addCustomerDialog } from '../../assets/css/sellScreenStyles';

const styles = addCustomerDialog;

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const HoldSaleDialog = ({
  state: {
    openHoldSaleDialog,
    holdSaleNote,
    isLoading,
  },
  handleCartNoteDialogClose,
  handleHoldNoteInPutChange,
  handleAddHeldSaleButton,
}) => (
  <Dialog
    open={openHoldSaleDialog}
    maxWidth="sm"
    fullWidth
    TransitionComponent={Transition}
    onClose={handleCartNoteDialogClose}
    aria-labelledby="add-customer-dialog"
    id="add-customer-dialog"
    BackdropProps={{
      invisible: true
    }}
  >
    <DialogTitle
      id="alert-dialog-slide-title"
      style={addCustomerDialog.dialogTitle}
    >
      Add a note
    </DialogTitle>
    <DialogContent style={addCustomerDialog.dialogContentGrid}>
      <Grid
        container
        spacing={16}
        style={addCustomerDialog.holdSaleGridTop}
      >
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            You are about to hold this sale.
            This note will be a quick identifier when you decide to continue with it.
          </Typography>
        </Grid>
        <Grid item xs={12} style={addCustomerDialog.dialogContentGrid}>
          <TextField
            id="holdnote"
            name="holdSaleNote"
            margin="normal"
            variant="outlined"
            autoFocus
            multiline
            rows="2"
            fullWidth
            value={holdSaleNote}
            onChange={handleHoldNoteInPutChange}
          />
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Grid
        item
        xs={12}
        align="right"
        style={addCustomerDialog.holdSaleGridRight}
      >
        {isLoading ? (<Loader />)
          : [
            <Button
              key="cancel-button"
              variant="contained"
              style={addCustomerDialog.cancelButton}
              color="secondary"
              onClick={handleCartNoteDialogClose}
            >
              Cancel
            </Button>,
            <Button
              key="hold-button"
              variant="contained"
              color="primary"
              style={addCustomerDialog.addButton}
              onClick={handleAddHeldSaleButton}
            >
              Hold Sale
            </Button>
          ]
        }
      </Grid>
    </DialogActions>
  </Dialog>
);

HoldSaleDialog.propTypes = {
  state: PropTypes.instanceOf(Object),
  handleCartNoteDialogClose: PropTypes.func.isRequired,
  handleHoldNoteInPutChange: PropTypes.func.isRequired,
  handleAddHeldSaleButton: PropTypes.func.isRequired,
};

HoldSaleDialog.defaultProps = {
  state: {}
};

export default withStyles(styles)(HoldSaleDialog);

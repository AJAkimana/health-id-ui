import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Popover, Typography, Button
} from '@material-ui/core';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

const ConfirmClose = ({
  isConfirmPopperOpen,
  confirmAnchorEl,
  confirmPlacement,
  handleCloseConfirmPopOver,
  handleClosePaymentDialog
}) => (
  <Popover
    id={1}
    elevation={0}
    open={isConfirmPopperOpen}
    anchorEl={confirmAnchorEl}
    placement={confirmPlacement}
    onClose={handleCloseConfirmPopOver}
    PaperProps={salesDialogStyles.confirmClosePaperProps}
    anchorOrigin={salesDialogStyles.anchorOrigin}
    transformOrigin={salesDialogStyles.transformOrigin}
  >
    <Grid container>
      <Grid
        item
        xs={12}
        style={salesDialogStyles.gridContainer}
      >
        <Typography align="center" variant="h6">Are you sure you want to close</Typography>
      </Grid>

      <Grid item container xs={12} justify="flex-end">
        <Button
          variant="contained"
          onClick={handleCloseConfirmPopOver}
          color="secondary"
          style={salesDialogStyles.confirmButton}
        >
            No
        </Button>
        <Button
          variant="contained"
          onClick={handleClosePaymentDialog}
          color="secondary"
          style={salesDialogStyles.confirmButton}
        >
            Yes
        </Button>

      </Grid>
    </Grid>
  </Popover>
);

ConfirmClose.propTypes = {
  isConfirmPopperOpen: PropTypes.bool.isRequired,
  confirmAnchorEl: PropTypes.shape({ subProp: PropTypes.object }).isRequired,
  confirmPlacement: PropTypes.string.isRequired,
  handleCloseConfirmPopOver: PropTypes.func.isRequired,
  handleClosePaymentDialog: PropTypes.func.isRequired,
};

export default ConfirmClose;

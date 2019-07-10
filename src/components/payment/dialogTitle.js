import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, DialogTitle, Button, Paper, Icon, Tooltip, Zoom
} from '@material-ui/core';
import { NotesIcon } from '../../assets/SvgIcons/sellScreenSvgs';
import profileStyles from '../../assets/styles/profile/profileStyles';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

const DialogHeader = (props) => {
  const {
    processing,
    handleBackToSalesSummary,
    handleBackToSellScreen,
    handleDisplayNotesPopper
  } = props;

  return (
    <Grid container>
      <Paper elevation={processing ? 0 : 1} style={salesDialogStyles.titlePaperStyle}>
        <Grid item container xs={12} justify={processing ? 'flex-start' : 'space-around'}>
          <Grid item xs={8}>
            <DialogTitle style={salesDialogStyles.dialogTitleStyle}>
              <div style={profileStyles.arrowButtonDiv}>
                <Button onClick={processing ? handleBackToSalesSummary : handleBackToSellScreen}>
                  <Tooltip title={processing ? 'To Sales Summary' : 'To Product Cart'} TransitionComponent={Zoom}>
                    <Icon style={profileStyles.arrowIcon}>arrow_back</Icon>
                  </Tooltip>
                </Button>
                <span style={salesDialogStyles.arrowLabel}>{processing ? 'Payment Summary' : 'Sales Summary'}</span>
              </div>
            </DialogTitle>
          </Grid>
          {
            !processing && (
              <Grid item xs={4} style={salesDialogStyles.showNotesGridStyles}>
                <Tooltip title="Show Notes" TransitionComponent={Zoom} id="tool-tip">
                  <NotesIcon
                    id="notesAnchor"
                    style={salesDialogStyles.notesIcon}
                    onClick={handleDisplayNotesPopper}
                  />
                </Tooltip>
              </Grid>
            )
          }

        </Grid>
      </Paper>
    </Grid>
  );
};

DialogHeader.propTypes = {
  processing: PropTypes.bool.isRequired,
  handleBackToSalesSummary: PropTypes.func.isRequired,
  handleBackToSellScreen: PropTypes.func.isRequired,
  handleDisplayNotesPopper: PropTypes.func.isRequired
};

export default DialogHeader;

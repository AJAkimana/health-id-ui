import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogContent, DialogTitle, Slide, Typography
} from '@material-ui/core';
import moment from 'moment';
import 'moment-precise-range-plugin';
import Moment from 'react-moment';
import { customerDetailsDialog as styles } from '../../assets/css/sellScreenStyles';
import ContactDetails from './contactDetails';
import EmergencyContact from './emergencyContact';
import LoyaltyPaper from './loyaltyPaper';
import ContactHeader from './contactHeader';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export const CustomerDetailDialog = ({
  state,
  handleCustomerDialogClose,
  handleEditSelectedCustomer,
}) => {
  const { openCustomerDetailsDialog } = state;
  const dataRangeHuman = (start) => {
    const starts = moment(start);
    const ends = moment();
    const diff = moment.preciseDiff(starts, ends);
    if (diff.includes('days')) {
      return diff.split(/(?<=days)/)[0];
    }
    return diff.split(/(?<=months)/)[0];
  };
  const renderDateRange = createdAt => (
    <Fragment>
      <Moment format="DD/MM/YYYY" style={styles.momentDate}>
        {createdAt}
      </Moment>
      <Typography variant="caption" style={styles.captionText}>
        &nbsp;
        {`(${dataRangeHuman(createdAt)} ago)`}
      </Typography>
    </Fragment>
  );
  return (
    <Dialog
      open={openCustomerDetailsDialog}
      onClose={handleCustomerDialogClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      aria-labelledby="customer-details-dialog"
      id="customer-details-dialog"
      BackdropProps={{
        invisible: true
      }}
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        style={styles.dialogTitle}
      >
        <ContactHeader
          state={state}
          renderDateRange={renderDateRange}
          handleEditSelectedCustomer={handleEditSelectedCustomer}
          dataRangeHuman={dataRangeHuman}
        />
      </DialogTitle>
      <DialogContent style={styles.dialogContent}>
        <LoyaltyPaper
          state={state}
        />
        <ContactDetails
          state={state}
          renderDateRange={renderDateRange}
        />
        <EmergencyContact
          state={state}
        />
      </DialogContent>
    </Dialog>
  );
};

CustomerDetailDialog.propTypes = {
  state: PropTypes.instanceOf(Object),
  handleCustomerDialogClose: PropTypes.func.isRequired,
  handleEditSelectedCustomer: PropTypes.func.isRequired,
};

CustomerDetailDialog.defaultProps = {
  state: {}
};

export default CustomerDetailDialog;

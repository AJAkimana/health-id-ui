import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { customerDetailsDialog as styles } from '../../assets/css/sellScreenStyles';
import { renderDetailsTypo } from './utils';

export const EmergencyContact = ({
  state: {
    selectedCustomer: {
      emergencyContactName,
      emergencyContactEmail,
      emergencyContactNumber,
    }
  }
}) => (
  <Fragment>
    <Grid item container xs={12} style={styles.rowHeader}>
      <Typography variant="subtitle2" style={styles.rowHeaderTypo}>
          Emergency Contact Information
        </Typography>
    </Grid>
    <div style={styles.contactDetails}>
      <Grid item container xs={12}>
        <Grid item xs={4}>
          {renderDetailsTypo('Contact Name', emergencyContactName, styles.captionText)}
        </Grid>
        <Grid item xs={4}>
          {renderDetailsTypo('Contact Mobile #', emergencyContactNumber, styles.captionText)}
        </Grid>
        <Grid item xs={4}>
          {renderDetailsTypo('Contact Email', emergencyContactEmail, styles.captionText)}
        </Grid>
      </Grid>
    </div>
  </Fragment>
);

EmergencyContact.propTypes = {
  state: PropTypes.instanceOf(Object)
};

EmergencyContact.defaultProps = {
  state: {},
};

export default EmergencyContact;

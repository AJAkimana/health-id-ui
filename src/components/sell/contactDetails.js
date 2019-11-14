import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { customerDetailsDialog as styles } from '../../assets/css/sellScreenStyles';
import { renderDetailsTypo } from './utils';

export const ContactDetails = ({
  state: {
    selectedCustomer: {
      email,
      primaryMobileNumber,
      secondaryMobileNumber,
      addressLine1,
      localGovernmentArea,
      city,
      country,
      saleSet
    }
  },
  renderDateRange
}) => {
  const latestVisit = (visits) => {
    const lastVisit = visits.map(visit => visit.createdAt).sort().slice(-1);
    return renderDateRange(lastVisit);
  };
  return (
    <Fragment>
      <Grid item container xs={12} style={styles.rowHeader}>
        <Typography variant="subtitle2" style={styles.rowHeaderTypo}>
          Contact Details
        </Typography>
      </Grid>
      <div style={styles.contactDetails}>
        <Grid item container xs={12}>
          <Grid item xs={4}>
            {renderDetailsTypo('Mobile #', primaryMobileNumber, styles.captionText)}
          </Grid>
          <Grid item xs={4}>
            {renderDetailsTypo('Other Phone #', secondaryMobileNumber, styles.captionText)}
          </Grid>
          <Grid item xs={4}>
            {renderDetailsTypo('Email', email, styles.captionText)}
          </Grid>
        </Grid>
        <Grid item container xs={12} style={styles.contactInner}>
          <Grid item xs={4}>
            <Typography variant="caption" style={styles.captionText}>
              Address
            </Typography>
            <Typography style={styles.addressText}>{addressLine1 && `${addressLine1},`}</Typography>
            <Grid item container direction="row">
              {localGovernmentArea && (
                <Typography style={styles.addressText}>
                  {`${localGovernmentArea},`}
                  &nbsp;
                </Typography>
              )}
              <Typography style={styles.addressText}>
                {city && `${city.name},`}
              </Typography>
            </Grid>
            <Typography style={styles.addressText}>{country && `${country.name}`}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="caption" style={styles.captionText}>
              Total Visits
            </Typography>
            <Typography variant="caption">
              {saleSet && saleSet.length}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="caption" style={styles.captionText}>
              Last Visit
            </Typography>
            <Grid item container direction="row">
              {saleSet.length > 0 ? latestVisit(saleSet) : (
                <Typography variant="caption">No visit yet</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

ContactDetails.propTypes = {
  state: PropTypes.instanceOf(Object),
  renderDateRange: PropTypes.func.isRequired
};

ContactDetails.defaultProps = {
  state: {},
};

export default ContactDetails;

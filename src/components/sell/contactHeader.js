import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, IconButton
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { customerDetailsDialog as styles } from '../../assets/css/sellScreenStyles';

export const ContactHeader = ({
  state: {
    selectedCustomer: {
      createdAt,
      id,
      firstName,
      lastName,
    }
  },
  renderDateRange,
  handleEditSelectedCustomer,
}) => (
  <Fragment>
    <Grid container>
      <Grid item container xs={8} direction="column">
        <Typography variant="h5" style={styles.name}>{`${firstName} ${lastName}`}</Typography>
        <Grid item container direction="row">
          <Typography variant="caption" style={styles.captionText}>Customer ID:&nbsp;</Typography>
          <Typography variant="caption">{id}</Typography>
        </Grid>
        <Grid item container direction="row">
          <Typography variant="caption" style={styles.captionText}>Member Since:&nbsp;</Typography>
          {createdAt && renderDateRange(createdAt)}
        </Grid>
      </Grid>
      <Grid item xs={4} align="right">
        <IconButton
          aria-label="Edit"
          onClick={() => handleEditSelectedCustomer()}
          style={styles.icon}
        >
          <Edit />
        </IconButton>
      </Grid>
    </Grid>
  </Fragment>
);

ContactHeader.propTypes = {
  state: PropTypes.instanceOf(Object),
  renderDateRange: PropTypes.func.isRequired,
  handleEditSelectedCustomer: PropTypes.func.isRequired
};

ContactHeader.defaultProps = {
  state: {},
};

export default ContactHeader;

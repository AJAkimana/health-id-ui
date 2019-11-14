import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Paper } from '@material-ui/core';
import { customerDetailsDialog as styles } from '../../assets/css/sellScreenStyles';

export const LoyaltyPaper = ({
  state: {
    selectedCustomer: {
      loyaltyMember,
      loyaltyPoints,
      wallet
    }
  }
}) => (
  <Paper elevation={0} square style={styles.loyaltyPaper}>
    <Grid container xs={12}>
      <Grid item xs={4} direction="column">
        <Typography variant="caption" style={styles.captionText}>
            Loyalty member
        </Typography>
        <Typography variant="subtitle2" style={styles.loyaltyMember}>
          {loyaltyMember ? 'Yes' : 'No'}
        </Typography>
      </Grid>
      <Grid item xs={4} direction="column" align="center">
        <Typography variant="caption" style={styles.captionText}>
            Loyalty points
        </Typography>
        <Typography variant="subtitle2" style={styles.loyaltyPoints}>
          {loyaltyPoints}
        </Typography>
      </Grid>
      <Grid item xs={4} direction="column" align="right">
        <Typography variant="caption" style={styles.captionText}>
            Store credit
        </Typography>
        <Typography variant="subtitle2" style={styles.storeCredit}>
          {wallet ? wallet.storeCredit : 0}
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

LoyaltyPaper.propTypes = {
  state: PropTypes.instanceOf(Object)
};

LoyaltyPaper.defaultProps = {
  state: {},
};

export default LoyaltyPaper;

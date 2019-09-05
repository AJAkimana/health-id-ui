import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { lowerNavbarStyles } from '../../assets/styles/suppliers/suppliers';

export const LowerNavbar = () => (
  <div>
    <Grid container justify="center" style={lowerNavbarStyles.gridContainer}>
      <Grid item xs={2} style={lowerNavbarStyles.items}>
        <Typography variant="inherit" style={lowerNavbarStyles.typographyText}>
          Orders
        </Typography>
      </Grid>

      <Grid item xs={2} style={lowerNavbarStyles.itemActive}>
        <Typography variant="inherit" style={lowerNavbarStyles.typographyText}>
          Suppliers
        </Typography>
      </Grid>

      <Grid item xs={8} />
    </Grid>
  </div>
);

export default LowerNavbar;

import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Grid } from '@material-ui/core';
import { FooterStyles } from '../../../assets/styles/setup';
import { styledFooter } from '../../../assets/styles/suppliers/suppliers';
import IconFactory from '../../../assets/images/iconFactory/IconFactory';
import map from '../../../assets/images/suppliers/map.png';
import rich from '../../../assets/images/suppliers/rich.png';
import keyboard from '../../../assets/images/suppliers/keyboard.png';

const Footer = () => (
  <Fragment>
    <AppBar className="footer" style={FooterStyles.appbar}>
      <Grid container>
        <Grid item xs={4} style={styledFooter.item1}>
          <Typography variant="inherit">
            <IconFactory iconAlt="money" type={rich} iconStyle={styledFooter.icons} />
            CURRENCY: NGN
            (
            <span style={styledFooter.naira}>
            &#x20A6;
            </span>
            )
          </Typography>
        </Grid>
        <Grid item xs={4} style={styledFooter.item2}>
          <Typography variant="inherit">
            <IconFactory iconAlt="map" type={map} iconStyle={styledFooter.icons} />
            OUTLET NAME, LOCATION
          </Typography>
        </Grid>
        <Grid item xs={4} style={styledFooter.item3}>
          <Typography variant="inherit">
            <IconFactory iconAlt="keyboard" type={keyboard} iconStyle={styledFooter.icons} />
            REGISTER
          </Typography>
        </Grid>
      </Grid>
    </AppBar>
  </Fragment>
);

export default Footer;

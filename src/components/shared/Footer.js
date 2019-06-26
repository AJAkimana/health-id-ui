import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { FooterStyles } from '../../assets/styles/setup';

const Footer = () => (
  <Fragment>
    <AppBar className="footer" style={FooterStyles.appbar}>
      <Toolbar style={FooterStyles.toolBar} />
    </AppBar>
  </Fragment>
);

export default Footer;

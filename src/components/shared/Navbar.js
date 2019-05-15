import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from '../../assets/images/ID Nav logo.png';
import { NavBarStyles } from '../../assets/css/setup';

const NavBar = () => (
  <Fragment>
    <AppBar position="sticky" style={NavBarStyles.appbar}>
      <Toolbar style={NavBarStyles.toolBar}>
        <img className="logo" src={logo} alt="some text" style={NavBarStyles.logo} />
        <Typography variant="h5" style={NavBarStyles.typography}>
            SETUP ACCOUNT
        </Typography>
        <div />
      </Toolbar>
    </AppBar>
  </Fragment>
);

export default NavBar;

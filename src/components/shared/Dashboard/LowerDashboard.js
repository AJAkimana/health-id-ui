import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import calendar from '../../../assets/images/dashboard/calendar.png';
import notification from '../../../assets/images/dashboard/notification.png';
import lowerDashboardStyles from '../../../assets/css/lowerDashboardStyles';

const LowerDashboard = ({
  username, open, anchorEl, handleMenu, handleClose
}) => {
  const date = new Date();
  const newDate = String(date).slice(0, 25);
  const slicedDate = newDate.toString().split(' ').slice(0, 4).join(' ');
  const localle = String(date).slice(27);

  return (
    <Grid container justify="center" style={lowerDashboardStyles.gridContainer}>
      <Grid item xs={8} style={lowerDashboardStyles.gridItem1}>
        <Typography
          variant="inherit"
          style={lowerDashboardStyles.typographyText}
        >
          {slicedDate}
&emsp;
          {localle}

        </Typography>
      </Grid>

      <Grid item xs={1} style={lowerDashboardStyles.gridItem2}>
        <img alt="alternative text" src={calendar} style={lowerDashboardStyles.gridImage} />
      </Grid>

      <Grid item xs={1} style={lowerDashboardStyles.gridItem2}>
        <img alt="alternative text" src={notification} style={lowerDashboardStyles.gridImage} />
      </Grid>

      <Grid item xs={2}>
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={lowerDashboardStyles.menuStyles}
          transformOrigin={lowerDashboardStyles.menuStyles}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
          <MenuItem onClick={handleClose}>Switch Account</MenuItem>
        </Menu>
        <span>
          {`${username}`}
          {' '}
          <span style={lowerDashboardStyles.loginText}>is logged in</span>
        </span>
      </Grid>
    </Grid>
  );
};

LowerDashboard.propTypes = {
  username: PropTypes.string,
  open: PropTypes.bool,
  anchorEl: PropTypes.instanceOf(Object),
  handleMenu: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

LowerDashboard.defaultProps = {
  username: '',
  open: false,
  anchorEl: '',
};

export default LowerDashboard;

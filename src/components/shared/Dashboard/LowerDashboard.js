import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import moment from 'moment-timezone';

import calendar from '../../../assets/images/dashboard/calendar.png';
import notification from '../../../assets/images/dashboard/notification.png';
import lowerDashboardStyles from '../../../assets/styles/dashboard/lowerDashboardStyles';
import SwitchAccount from '../../authentication/SwitchAcount';

const zoneNames = {
  EST: 'Eastern Standard Time',
  EAT: 'Eastern Africa Time',
  WAT: 'Western Africa Time',
  EDT: 'Eastern Daylight Time',
  CST: 'Central Standard Time',
  CDT: 'Central Daylight Time',
  MST: 'Mountain Standard Time',
  MDT: 'Mountain Daylight Time',
  PST: 'Pacific Standard Time',
  PDT: 'Pacific Daylight Time',
};

const LowerDashboard = ({
  username, open, anchorEl, timeZone, handleMenu, handleClose, handleLogOut
}) => {
  const [IsOpen, setOpen] = useState(false);

  const today = moment.tz(new Date(), timeZone);

  // overrides moment zoneAbbr function to display timezone with full name
  moment.fn.zoneName = function () {
    // eslint-disable-next-line react/no-this-in-sfc
    const abbreviation = this.zoneAbbr();
    return zoneNames[abbreviation] || abbreviation;
  };

  const date = today.format('dddd, MMMM Do YYYY');
  const locale = `T ${today.format('Z')} (${today.zoneName()})`;

  const showSwitchAccount = () => {
    setOpen(!IsOpen);
    handleClose();
  };

  return (
    <div>
      <Grid container justify="center" style={lowerDashboardStyles.gridContainer}>
        <Grid item xs={8} style={lowerDashboardStyles.gridItem1}>
          <Typography variant="inherit" style={lowerDashboardStyles.typographyText}>
            {date}
            &emsp;
            {locale}
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
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            <MenuItem onClick={() => showSwitchAccount()}>Switch Account</MenuItem>
          </Menu>
          <span>{`${username}`}</span>
        </Grid>
      </Grid>
      <SwitchAccount open={IsOpen} handleClose={() => setOpen(false)} anchorEl={anchorEl} />
    </div>
  );
};

LowerDashboard.propTypes = {
  username: PropTypes.string,
  open: PropTypes.bool,
  anchorEl: PropTypes.instanceOf(Object),
  handleMenu: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  timeZone: PropTypes.string,
};

LowerDashboard.defaultProps = {
  username: '',
  open: false,
  anchorEl: '',
  timeZone: 'Africa/Nairobi'
};

export default LowerDashboard;

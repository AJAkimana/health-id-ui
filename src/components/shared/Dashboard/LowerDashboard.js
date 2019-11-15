import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import moment from 'moment-timezone';
import {
  CalenderIcon2, Notification, User, Register
} from '../../../assets/SvgIcons/sellScreenSvgs';
import lowerDashboardStyles from '../../../assets/styles/dashboard/lowerDashboardStyles';
import SwitchAccount from '../../authentication/SwitchAcount';

const styles = lowerDashboardStyles;

const LowerDashboard = ({
  activeOutlet, username, open, anchorEl, handleMenu, handleClose, handleLogOut
}) => {
  const outletName = activeOutlet && activeOutlet.name;
  const cityName = activeOutlet && activeOutlet.city.name;
  const [IsOpen, setOpen] = useState(false);

  const today = moment(new Date());
  const date = today.format('ddd Do MMM');
  const time = today.format('HH:mm');

  const showSwitchAccount = () => {
    setOpen(!IsOpen);
    handleClose();
  };

  return (
    <div>
      <Grid container justify="center" style={styles.gridContainer}>
        <Grid item xs={4} style={styles.timeGrid}>
          <Typography variant="inherit">
            {date}
            &emsp;
            {time}
          </Typography>
        </Grid>
        <Grid item xs={4} align="center" style={styles.timeGrid}>
          <Typography variant="inherit">
            {`${outletName}, ${cityName}`}
          </Typography>
        </Grid>
        <Grid item xs={4} align="right" style={styles.iconsGrid}>
          <IconButton style={styles.gridButton}>
            <Register style={styles.gridIcon} />
          </IconButton>

          <IconButton style={styles.gridButton}>
            <CalenderIcon2 style={styles.gridIcon} />
          </IconButton>

          <IconButton style={styles.gridButton}>
            <Notification style={styles.gridIcon} />
          </IconButton>
          <Tooltip
            title={<Typography color="inherit">{`${username}`}</Typography>}
          >
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              style={styles.gridButton}
              onClick={handleMenu}
              color="inherit"
            >
              <User style={styles.gridIcon} />
            </IconButton>
          </Tooltip>
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
  activeOutlet: PropTypes.instanceOf(Object),
  handleMenu: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

LowerDashboard.defaultProps = {
  username: '',
  open: false,
  anchorEl: '',
  activeOutlet: {},
};

export default LowerDashboard;

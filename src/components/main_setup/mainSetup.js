import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// MATERIAL UI COMPONENTS
import {
  Grid,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

// IMAGES AND ICONS
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import OpenInNew from '@material-ui/icons/OpenInNew';
import Avatar from '../../assets/images/mainSettingsAvatar.png';

// SHARED COMPONENTS
import Dashboard from '../shared/Dashboard/Dashboard';
import withAuth from '../withAuth';
import { MainSetupStyles as styles } from '../../assets/styles/setup';

export const MainSetup = ({ session, classes }) => (
  <Fragment>
    <Dashboard isActive="grid9" session={session} />
    <Grid container>
      <Grid item xs={10} style={styles.container}>
        <Paper style={styles.paper}>
          <Grid item style={styles.usernameBox}>
            <Grid style={styles.usernameDetailsBox}>
              <img src={Avatar} alt="User" style={styles.avatarIcon} />
              <Grid item style={styles.usernameDetails}>
                <Typography variant="h5">
                  {session.me.username}
                </Typography>
                <Typography color="textSecondary">
                  {session.me.role.name}
                </Typography>
              </Grid>
            </Grid>
            <Button style={styles.backButton}>
              <Link to="/main_setup/profile" style={styles.link}>
                <OpenInNew fontSize="large" />
              </Link>
            </Button>
          </Grid>
          {
            session.me.role.name === 'Master Admin' && (
              <Grid item style={styles.navsBox}>
                <Link to="/main_setup/business_information" style={styles.option}>
                  <Grid className={classes.navs}>
                    <Typography color="textSecondary" variant="h6">
                      Business Information
                    </Typography>
                    <KeyboardArrowRight />
                  </Grid>
                </Link>
                <Link to="/main_setup/outlets_registers" style={styles.option}>
                  <Grid className={classes.navs}>
                    <Typography color="textSecondary" variant="h6">
                      Outlet and Registers
                    </Typography>
                    <KeyboardArrowRight />
                  </Grid>
                </Link>
                <Link to="/main_setup/users" style={styles.option}>
                  <Grid className={classes.navs}>
                    <Typography color="textSecondary" variant="h6">
                      Users
                    </Typography>
                    <KeyboardArrowRight />
                  </Grid>
                </Link>
              </Grid>
            )
          }
        </Paper>
      </Grid>
    </Grid>

  </Fragment>
);


MainSetup.propTypes = {
  session: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withAuth(withStyles(styles)(MainSetup));

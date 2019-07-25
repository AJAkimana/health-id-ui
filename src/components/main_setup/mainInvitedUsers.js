import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Grid,
  Button,
  Typography,
  Paper,
} from '@material-ui/core';

import ArrowBack from '@material-ui/icons/ArrowBack';
import Dashboard from '../shared/Dashboard/Dashboard';
import withAuth from '../withAuth';
import { MainOutletSetupStyles, SetupHeader } from '../../assets/styles/setup';
import MainInvitedUsersList from './mainInvitedUsersList';

const MainInvitedUsers = ({ session }) => (
  <Fragment>
    <Dashboard isActive="grid9" session={session} />
    <Grid container style={SetupHeader.container}>
      <Grid item xs={1} style={SetupHeader.backBox}>
        <Button style={SetupHeader.backButton}>
          <Link to="/main_setup" style={SetupHeader.link}>
            <ArrowBack fontSize="large" />
          </Link>
        </Button>
      </Grid>
      <Grid item xs={10}>
        <Grid style={MainOutletSetupStyles.header}>
          <Typography variant="h5">
            Back
          </Typography>
        </Grid>
        <Paper>
          <Typography variant="h6" style={MainOutletSetupStyles.formTitle}>
            Users
          </Typography>
          <hr />
          <Grid item xs={11} style={MainOutletSetupStyles.tableBox}>
            <MainInvitedUsersList session={session} />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </Fragment>
);


MainInvitedUsers.propTypes = {
  session: PropTypes.shape({}).isRequired,
};

export default withAuth(MainInvitedUsers);

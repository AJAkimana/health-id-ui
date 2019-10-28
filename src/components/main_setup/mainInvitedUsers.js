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
import withAuth from '../withAuth';
import { MainOutletSetupStyles, SetupHeader } from '../../assets/styles/setup';
import MainInvitedUsersList from './mainInvitedUsersList';
import { useStateValue } from '../../providers/stateProvider';

const MainInvitedUsers = ({ session }) => {
  const [, dispatch] = Object.values(useStateValue());

  React.useEffect(() => {
    dispatch({
      type: 'changeGrid',
      grid: 'grid9'
    });
  }, []);

  return (
    <Fragment>
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
};


MainInvitedUsers.propTypes = {
  session: PropTypes.shape({}).isRequired,
};

export default withAuth(MainInvitedUsers);

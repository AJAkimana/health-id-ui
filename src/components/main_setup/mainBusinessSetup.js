import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  Button,
  Typography,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import MainBusinessList from './mainBusinessList';
import Dashboard from '../shared/Dashboard/Dashboard';
import { MainBusinessSetUpStyles as styles, SetupHeader } from '../../assets/styles/setup';

const MainSetup = (props) => {
  const { session } = props;
  const { businesses } = session.me;
  return (
    <Fragment>
      <Dashboard isActive="grid9" session={session} />
      <Grid container style={styles.container}>
        <Grid item xs={1} style={SetupHeader.backBox}>
          <Button style={SetupHeader.backButton}>
            <Link to="/main_setup" style={SetupHeader.link}>
              <ArrowBack fontSize="large" />
            </Link>
          </Button>
        </Grid>
        <Grid item xs={10}>
          <Grid style={styles.profileHeader}>
            <Typography variant="h5">
              Back
            </Typography>
          </Grid>
          <Paper style={styles.paper}>
            <Grid>
              <Grid item style={styles.contentHeader}>
                <Typography variant="h6">
                  User Businesses
                </Typography>
              </Grid>
            </Grid>
            <MainBusinessList businessList={businesses} />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

MainSetup.propTypes = {
  session: PropTypes.shape({}).isRequired,
};

export default MainSetup;

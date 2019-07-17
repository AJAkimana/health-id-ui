import React, { Component, Fragment } from 'react';
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
import { MainOutletSetupStyles, SetupHeader } from '../../assets/styles/setup';
import MainOutletSetupList from './mainOutletSetupList';
import MainOutletSetupForm from './mainOutletSetupForm';

class MainOutletSetup extends Component {
  state = {
    listView: true,
  }

  render() {
    const { session } = this.props;
    const { listView } = this.state;
    const { outlets } = session.me;

    return (
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
                Outlets &amp; Registers
              </Typography>
              <hr />
              <Grid item xs={11} style={MainOutletSetupStyles.tableBox}>
                {
                  listView
                    ? <MainOutletSetupList outletsList={outlets} />
                    : <MainOutletSetupForm />
                }
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

MainOutletSetup.propTypes = {
  session: PropTypes.shape({}).isRequired,
};

export default MainOutletSetup;

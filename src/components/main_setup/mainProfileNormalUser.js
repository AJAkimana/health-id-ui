import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// MATERIAL UI COMPONENTS
import {
  Grid, Paper, Button, Typography, TextField
} from '@material-ui/core';

// IMAGES AND ICONS
import ArrowBack from '@material-ui/icons/ArrowBack';

// SHARED COMPONENTS
import Dashboard from '../shared/Dashboard/Dashboard';
import { MainProfileStyles as styles, SetupHeader } from '../../assets/styles/setup';

const MainSetup = (props) => {
  const { session } = props;
  const { me: data } = session;
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
            <Typography variant="h5">Profile</Typography>
            <Link to="/main_setup/profile/manage_profile_user" style={styles.btnLink}>
              <Button variant="contained" color="primary">
                Manage Profile
              </Button>
            </Link>
          </Grid>
          <Paper style={styles.paper}>
            <Typography variant="h6" style={styles.contentHeader}>
              Personal Details
            </Typography>
            <Grid item style={styles.profileBox}>
              <Grid item xs={4} style={styles.formRow}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={data && data.firstName ? data.firstName : 'Not Available'}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Username"
                  value={data && data.username ? data.username : 'Not Available'}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Phone #"
                  value={data && data.mobileNumber ? data.mobileNumber : 'Not Available'}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              <Grid item xs={4} style={styles.formRow}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={data && data.lastName ? data.lastName : 'Not Available'}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={data && data.email ? data.email : 'Not Available'}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Birthday"
                  value={data && data.birthday ? data.birthday : 'Not Available'}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              <Grid item xs={4} style={styles.avatarIconBox}>
                <img src={data.profileImage} alt="User" style={styles.avatarIcon} />
              </Grid>
            </Grid>
            <Typography variant="h6" style={styles.contentHeader}>
              Business Details
            </Typography>
            <Grid item style={styles.profileBox}>
              <Grid item xs={4} style={styles.formRow}>
                <TextField
                  fullWidth
                  label="Role"
                  value={data && data.role.name ? data.role.name : 'Not Available'}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              <Grid item xs={4} style={styles.formRow}>
                <TextField
                  fullWidth
                  label="Job Title"
                  value={data && data.jobTitle ? data.jobTitle : 'Not Available'}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              <Grid item xs={4} style={styles.formRow}>
                <TextField
                  fullWidth
                  label="Weekly Target"
                  value={data && data.weeklyTarget ? data.weeklyTarget : 'NIL'}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              <Grid item xs={4} style={styles.formRow}>
                <TextField
                  fullWidth
                  label="Starting date"
                  value={data && data.startingDate ? data.startingDate : 'Not Available'}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

MainSetup.propTypes = {
  data: PropTypes.shape({}).isRequired,
  session: PropTypes.shape({
    me: PropTypes.shape({
      outlets: PropTypes.array
    })
  }).isRequired,
  getPreferences: PropTypes.shape({
    refetch: PropTypes.func
  })
};

MainSetup.defaultProps = {
  getPreferences: {}
};

export default MainSetup;

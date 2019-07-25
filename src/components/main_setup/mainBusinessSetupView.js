import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// MATERIAL UI COMPONENTS
import {
  Grid,
  Paper,
  Button,
  Typography,
  TextField,
} from '@material-ui/core';

// IMAGES AND ICONS
import ArrowBack from '@material-ui/icons/ArrowBack';
import LogoPlaceholder from '../../assets/images/business-placeholder.png';

// SHARED COMPONENTS
import Dashboard from '../shared/Dashboard/Dashboard';
import withAuth from '../withAuth';
import { MainBusinessSetUpStyles as styles, SetupHeader } from '../../assets/styles/setup';

const MainSetup = (props) => {
  const { session } = props;
  const { businesses } = session.me;

  const selectedBusiness = businesses.filter(
    business => business.id === window.location.href.split('/')[5]
  );

  const {
    addressLine1,
    businessEmail,
    facebook,
    instagram,
    legalName,
    phoneNumber,
    tradingName,
    twitter,
    website,
  } = selectedBusiness[0];

  return (
    <Fragment>
      <Dashboard isActive="grid9" session={session} />
      <Grid container style={styles.container}>
        <Grid item xs={1} style={SetupHeader.backBox}>
          <Button style={SetupHeader.backButton}>
            <Link to="/main_setup/business_information" style={SetupHeader.link}>
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
                <Typography variant="h5">
                  Business Information
                </Typography>
              </Grid>
            </Grid>
            <Grid item style={styles.profileBox}>
              <Grid item xs={8} style={styles.formRow}>
                <TextField
                  fullWidth
                  label="Legal Name"
                  value={legalName}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Trading Name"
                  value={tradingName}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Address"
                  value={addressLine1}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              <Grid item xs={4} style={styles.formRow}>
                <img src={LogoPlaceholder} alt="Logo" />
              </Grid>
            </Grid>
            <Grid>
              <Grid item style={styles.subContentHeader}>
                <Typography variant="h6">
                  Contact Information
                </Typography>
              </Grid>
            </Grid>
            <Grid item style={styles.profileBox}>
              <Grid item xs={6} style={styles.formRow}>
                <TextField
                  fullWidth
                  label="Primary Phone"
                  value={phoneNumber}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Twitter"
                  value={twitter}
                  defaultValue="N/A"
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              <Grid item xs={6} style={styles.formRow}>
                <TextField
                  fullWidth
                  label="Email"
                  value={businessEmail}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Facebook"
                  value={facebook}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              <Grid item xs={6} style={styles.formRow}>
                <TextField
                  fullWidth
                  label="Website"
                  value={website}
                  margin="normal"
                  style={styles.textField}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Instagram"
                  value={instagram}
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
  session: PropTypes.shape({}).isRequired,
};

export default withAuth(MainSetup);
